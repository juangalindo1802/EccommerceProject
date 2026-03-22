export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type ProductImageItem = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
};

export type ProductView = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  stock: number;
  featured: boolean;
  specs: string[];
  category: CategorySummary;
  images: ProductImageItem[];
};

