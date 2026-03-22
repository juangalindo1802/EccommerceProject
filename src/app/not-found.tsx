import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="container py-24">
        <Card className="mx-auto max-w-2xl border-dashed">
          <CardContent className="space-y-4 py-14 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Error 404</p>
            <h1 className="font-display text-5xl tracking-tight">Pagina no encontrada</h1>
            <p className="text-sm text-muted-foreground">
              La ruta que buscabas no existe o fue movida.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Ir al inicio</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Ver catalogo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}

