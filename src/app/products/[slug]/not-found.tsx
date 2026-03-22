import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="py-20">
        <div className="container">
          <Card className="mx-auto max-w-xl border-dashed">
            <CardContent className="space-y-4 py-12 text-center">
              <h1 className="font-display text-3xl">Producto no encontrado</h1>
              <p className="text-sm text-muted-foreground">
                El producto que buscas no existe o fue removido del catalogo.
              </p>
              <Button asChild>
                <Link href="/products">Ir al catalogo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}

