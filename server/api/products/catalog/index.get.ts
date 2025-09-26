import { db } from "@/lib/db/index";
import { ilike, inArray, eq, and, desc } from "drizzle-orm";
import {
  categories,
  productBrands,
  productImages,
  products,
} from "~/lib/db/schema";
import type { CatalogProduct } from "@/types/catalog";

export interface ApiCatalogResponse {
  success: boolean;
  data: CatalogProduct[];
  pagination: {
    limit: number;
    page: number;
    total: number;
  };
}

export default defineEventHandler(
  async (event): Promise<ApiCatalogResponse> => {
    const query = getQuery(event);

    try {
      const category = query.category as string;
      const brand = query.brand as string;
      const search = query.search as string;
      const page = parseInt(query.page as string) || 0;
      const limit = parseInt(query.limit as string) || 6;

      const prods = db
        .select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          shortDescription: products.shortDescription,
          originalPrice: products.originalPrice,
          isUniversal: products.isUniversal,
          stockQuantity: products.stockQuantity,
          attributes: products.attributes,
          category: {
            id: categories.id,
            name: categories.name,
            slug: categories.slug,
          },
          brand: {
            id: productBrands.id,
            name: productBrands.name,
            slug: productBrands.slug,
          },
          createdAt: products.createdAt,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .leftJoin(productBrands, eq(products.brandId, productBrands.id))
        .where(
          and(
            eq(products.isActive, true),
            category ? eq(categories.slug, category) : undefined,
            brand ? eq(productBrands.slug, brand) : undefined,
            search ? ilike(products.name, `%${search}%`) : undefined
          )
        )
        .orderBy(products.createdAt)
        .limit(limit)
        .offset(page * limit);

      const prodsData = await prods;

      const prodsWithImages = await Promise.all(
        prodsData.map(async (prod) => {
          const images = await db
            .select()
            .from(productImages)
            .where(eq(productImages.productId, prod.id))
            .orderBy(productImages.sortOrder);

          return {
            ...prod,
            images: images,
          };
        })
      );

      return {
        success: true,
        data: prodsWithImages,
        pagination: {
          limit: limit,
          page: page,
          total: prodsWithImages.length,
        },
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: "Fetch Products | Failure.",
      });
    }
  }
);
