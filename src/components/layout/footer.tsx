import Link from "next/link";

const footerColumns = [
  {
    title: "Explorar",
    links: [
      { label: "Catalogo", href: "/products" },
      { label: "Categorias", href: "/categories" },
      { label: "Beneficios", href: "/benefits" },
      { label: "Historia", href: "/story" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Mi cuenta", href: "/account" },
      { label: "Ordenes", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Carrito", href: "/cart" },
    ],
  },
  {
    title: "Proyecto",
    links: [
      { label: "Admin", href: "/admin" },
      { label: "Login", href: "/login" },
      { label: "Registro", href: "/register" },
      { label: "Inicio", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/20">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl text-foreground">
              VANTA<span className="text-primary">.TECH</span>
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Ecommerce ficticio para portafolio personal enfocado en tecnologia premium.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VANTA.TECH. Proyecto demo para portafolio.</p>
          <p>Diseno y desarrollo con Next.js, Tailwind, shadcn/ui y Zustand.</p>
        </div>
      </div>
    </footer>
  );
}

