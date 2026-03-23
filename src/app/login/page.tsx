import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type LoginPageProps = {
  searchParams: Promise<{ registered?: string }>;
};

export const metadata: Metadata = {
  title: "Login",
  description: "Accede a tu cuenta para gestionar carrito, wishlist y ordenes.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { registered } = await searchParams;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container flex min-h-[70vh] items-center justify-center py-16">
        <LoginForm registered={registered === "1"} />
      </section>
      <Footer />
    </main>
  );
}

