import type { ProductImage } from "./product";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parentCategory: Category | null;
  isActive: boolean | null;
  sortOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type CatalogProduct = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: string;
  originalPrice: string | null;
  brand: {
    id: number;
    name: string;
    slug: string;
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  images: ProductImage[] | null;
  isUniversal: boolean | null;
  stockQuantity: number | null;
  attributes: Record<string, any> | unknown;
  createdAt: Date | null;
};
