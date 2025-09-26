import { defineStore } from "pinia";
import type { CatalogProduct } from "~/types/catalog";
import type { ApiCatalogResponse } from "~~/server/api/products/catalog/index.get";
export type CatalogQuery = {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export const useCatalogStore = defineStore("products", () => {
  const loading = ref(true);
  const error = ref<string | null>(null);
  const catalogProducts = ref<CatalogProduct[]>([]);

  const fetchCatalog = async (query: CatalogQuery = { limit: 6 }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiCatalogResponse>(
        "/api/products/catalog",
        {
          params: query,
        }
      );

      if (response.success) {
        catalogProducts.value = response.data;
        return response;
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (e) {
      console.error("Error fetching products:", e);
      error.value = e instanceof Error ? e.message : "Unknown error occurred";
      catalogProducts.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, catalogProducts, fetchCatalog };
});
