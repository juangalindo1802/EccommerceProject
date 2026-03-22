import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container flex min-h-[70vh] items-center justify-center py-16">
        <LoginForm />
      </section>
      <Footer />
    </main>
  );
}

