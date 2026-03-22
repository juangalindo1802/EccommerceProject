import { redirect } from "next/navigation";
import Link from "next/link";

import { logoutAction } from "@/app/actions/auth";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDatabaseConfigured, isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="container py-20">
          <Card className="mx-auto max-w-xl border-dashed">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              Configura las variables de entorno de Supabase para habilitar autenticacion.
            </CardContent>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  let profile = null;
  if (isDatabaseConfigured()) {
    try {
      profile = await prisma.user.findUnique({
        where: { id: data.user.id },
      });
    } catch {
      profile = null;
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-16">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="font-display text-3xl">Mi cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Email: <span className="font-medium text-foreground">{data.user.email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Nombre:{" "}
              <span className="font-medium text-foreground">
                {profile?.fullName ?? (data.user.user_metadata.full_name as string) ?? "Sin nombre"}
              </span>
            </p>
            <Button variant="outline" asChild>
              <Link href="/account/orders">Ver historial de ordenes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/wishlist">Ver wishlist</Link>
            </Button>
            <form action={logoutAction}>
              <Button type="submit" variant="outline">
                Cerrar sesion
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
