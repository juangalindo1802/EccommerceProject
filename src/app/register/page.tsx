import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Registro",
  description: "Crea tu cuenta para simular una experiencia ecommerce completa.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container flex min-h-[70vh] items-center justify-center py-16">
        <RegisterForm />
      </section>
      <Footer />
    </main>
  );
}
