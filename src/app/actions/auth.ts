"use server";

import { redirect } from "next/navigation";

import { isDatabaseConfigured, isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
};

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Configura las variables de Supabase para iniciar sesion." };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: "Credenciales invalidas o usuario no confirmado." };
  redirect("/account");
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Configura las variables de Supabase para registrar usuarios." };
  }

  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) return { error: error.message };

  if (data.user && isDatabaseConfigured()) {
    try {
      await prisma.user.upsert({
        where: { id: data.user.id },
        update: {
          email: data.user.email ?? email,
          fullName,
        },
        create: {
          id: data.user.id,
          email: data.user.email ?? email,
          fullName,
        },
      });
    } catch {
      // Keep auth flow working even if DB profile sync is temporarily unavailable.
    }
  }

  if (data.session) redirect("/account");
  redirect("/login?registered=1");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) redirect("/");

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
