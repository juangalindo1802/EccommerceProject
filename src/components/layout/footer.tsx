import Link from "next/link";

const footerColumns = [
  {
    title: "Colecciones",
    links: ["Audio", "Workstation", "Movilidad", "Streaming"],
  },
  {
    title: "Compañia",
    links: ["Nosotros", "Portafolio", "Roadmap", "Contacto"],
  },
  {
    title: "Recursos",
    links: ["Guías", "Comparativas", "FAQ", "Soporte"],
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
              Ecommerce ficticio para portafolio personal enfocado en tecnología premium.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="transition-colors hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VANTA.TECH. Proyecto demo para portafolio.</p>
          <p>Diseño y desarrollo con Next.js, Tailwind, shadcn/ui y Zustand.</p>
        </div>
      </div>
    </footer>
  );
}

