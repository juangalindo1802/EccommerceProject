import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/orders", label: "Ordenes" },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-3xl border border-border/70 bg-card/70 p-4">
      <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Admin
      </p>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

