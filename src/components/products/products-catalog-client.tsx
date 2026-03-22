"use client";

import { Search, SlidersHorizontal, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CategorySummary, ProductView } from "@/types/product";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

type ProductsCatalogClientProps = {
  products: ProductView[];
};

const sortLabels: Record<SortOption, string> = {
  featured: "Destacados primero",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  "rating-desc": "Mejor valorados",
};

export function ProductsCatalogClient({ products }: ProductsCatalogClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [isFiltering, setIsFiltering] = useState(true);

  const categoryOptions = useMemo(() => {
    const map = new Map<string, CategorySummary>();
    for (const product of products) map.set(product.category.id, product.category);
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  useEffect(() => {
    setIsFiltering(true);
    const timer = window.setTimeout(() => setIsFiltering(false), 240);
    return () => window.clearTimeout(timer);
  }, [query, selectedCategory, sortBy, onlyAvailable]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const data = products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.shortDescription.toLowerCase().includes(normalizedQuery) ||
        product.specs.some((spec) => spec.toLowerCase().includes(normalizedQuery));

      const matchesCategory =
        selectedCategory === "all" || product.category.id === selectedCategory;

      const matchesStock = !onlyAvailable || product.stock > 0;

      return matchesQuery && matchesCategory && matchesStock;
    });

    const sortedData = [...data];
    if (sortBy === "price-asc") sortedData.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sortedData.sort((a, b) => b.price - a.price);
    if (sortBy === "rating-desc") sortedData.sort((a, b) => b.rating - a.rating);
    if (sortBy === "featured") sortedData.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

    return sortedData;
  }, [products, query, selectedCategory, sortBy, onlyAvailable]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setOnlyAvailable(false);
  };

  return (
    <section className="py-10 md:py-12">
      <div className="container space-y-8">
        <div className="space-y-3">
          <Badge>Catalogo Premium</Badge>
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            Productos tecnologicos de alto rendimiento
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            Filtra, compara y encuentra el setup ideal para productividad, creacion y estilo.
          </p>
        </div>

        <Card className="border-border/70 bg-card/90">
          <CardContent className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="relative lg:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, descripcion o specs..."
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">Todas las categorias</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap items-center gap-2 md:col-span-2 lg:col-span-4">
              <Button
                variant={onlyAvailable ? "secondary" : "outline"}
                size="sm"
                onClick={() => setOnlyAvailable((prev) => !prev)}
              >
                <SlidersHorizontal className="mr-1 h-4 w-4" />
                Solo disponibles
              </Button>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar filtros
              </Button>
              <p className="ml-auto text-xs text-muted-foreground">
                {filteredProducts.length} resultado(s)
              </p>
            </div>
          </CardContent>
        </Card>

        {isFiltering ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
              <XCircle className="h-10 w-10 text-muted-foreground" />
              <h2 className="font-display text-2xl">Sin resultados</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                No encontramos productos que coincidan con tu busqueda y filtros actuales.
              </p>
              <Button onClick={clearFilters}>Restablecer filtros</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
