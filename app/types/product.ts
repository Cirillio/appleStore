import type { CatalogProduct, Category } from "./catalog";

export type ProductBrand = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  country: string | null;
  website: string | null;
  logoUrl: string | null;
  isActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type Product = Omit<CatalogProduct, "category" | "brand"> & {
  description: string | null;
  category: Category | null;
  brand: ProductBrand | null;
  sku: string | null;
  isActive: boolean | null;
  weight: number | null;
  dimensions: string | null;
  updatedAt: Date | null;
};

export type ProductImage = {
  id: number;
  productId: number;
  url: string;
  altText: string | null;
  isPrimary: boolean | null;
  sortOrder: number | null;
  createdAt: Date | null;
};
