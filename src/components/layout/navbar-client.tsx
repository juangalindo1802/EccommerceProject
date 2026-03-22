"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants";
import { useCartStore } from "@/store/cart-store";

type NavbarClientProps = {
  userEmail?: string;
  isAdmin?: boolean;
};

export function NavbarClient({ userEmail, isAdmin = false }: NavbarClientProps) {
  const [open, setOpen] = useState(false);
  const itemsCount = useCartStore((state) => state.itemCount());
  const openDrawer = useCartStore((state) => state.openDrawer);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight text-foreground">
          VANTA<span className="text-primary">.TECH</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" aria-label="Carrito" onClick={openDrawer}>
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <span className="text-xs text-muted-foreground">{itemsCount} items</span>
          {userEmail ? (
            <Button size="sm" variant="outline" asChild>
              <Link href="/account">Mi cuenta</Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Ingresar</Link>
            </Button>
          )}
          {isAdmin ? (
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          ) : null}
          <Button size="sm" asChild>
            <Link href="/products">Explorar coleccion</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" variant="outline" asChild>
              <Link href={userEmail ? "/account" : "/login"} onClick={() => setOpen(false)}>
                {userEmail ? "Mi cuenta" : "Ingresar"}
              </Link>
            </Button>
            {isAdmin ? (
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </Button>
            ) : null}
            <Button size="sm" className="w-full" asChild>
              <Link href="/products" onClick={() => setOpen(false)}>
                Explorar coleccion
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
                openDrawer();
              }}
            >
              Ver carrito ({itemsCount})
            </Button>
          </nav>
        </div>
      )}
      <CartDrawer />
    </header>
  );
}
