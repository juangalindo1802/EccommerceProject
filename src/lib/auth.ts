import { redirect } from "next/navigation";

import { isDatabaseConfigured, isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getRequiredUser() {
  if (!isSupabaseConfigured()) redirect("/login");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdminUser() {
  const user = await getRequiredUser();
  if (!isDatabaseConfigured()) redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { isAdmin: true },
  });

  if (!dbUser?.isAdmin) redirect("/");
  return user;
}

