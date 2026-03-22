import type { Metadata } from "next";
import Link from "next/link";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { requireAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "Panel administrativo de VANTA.TECH",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminUser();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="font-display text-2xl">
            VANTA<span className="text-primary">.ADMIN</span>
          </h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Volver a tienda</Link>
          </Button>
        </div>
      </div>

      <div className="container grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <section>{children}</section>
      </div>
    </main>
  );
}

