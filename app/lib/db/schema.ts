// lib/db/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Производители телефонов
export const phoneBrands = pgTable("phone_brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  country: varchar("country", { length: 100 }),
  website: varchar("website", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Модели телефонов
export const phoneModels = pgTable("phone_models", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id")
    .references(() => phoneBrands.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  releaseYear: integer("release_year"),
  screenSize: decimal("screen_size", { precision: 3, scale: 1 }), // 6.1, 6.7
  operatingSystem: varchar("operating_system", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Категории товаров
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  parentCategoryId: integer("parent_category_id").references(
    (): any => categories.id
  ),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Производители товаров/аксессуаров
export const productBrands = pgTable("product_brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  country: varchar("country", { length: 100 }),
  website: varchar("website", { length: 255 }),
  logoUrl: varchar("logo_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Товары
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }), // для скидок
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  brandId: integer("brand_id").references(() => productBrands.id),
  sku: varchar("sku", { length: 100 }).unique(),
  isUniversal: boolean("is_universal").default(false), // подходит для всех телефонов
  stockQuantity: integer("stock_quantity").default(0),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  weight: integer("weight"), // в граммах
  dimensions: varchar("dimensions", { length: 100 }), // "10x5x2 см"
  attributes: jsonb("attributes"), // JSON с атрибутами товара
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Совместимость товар-модель телефона
export const productCompatibility = pgTable(
  "product_compatibility",
  {
    productId: integer("product_id")
      .references(() => products.id)
      .notNull(),
    phoneModelId: integer("phone_model_id")
      .references(() => phoneModels.id)
      .notNull(),
  },
  (table) => ({
    pk: { columns: [table.productId, table.phoneModelId] },
  })
);

// Изображения товаров
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  isPrimary: boolean("is_primary").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Пользователи
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  isActive: boolean("is_active").default(true),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Заказы
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  guestEmail: varchar("guest_email", { length: 255 }), // для незарегистрированных
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, paid, shipped, delivered, cancelled
  paymentMethod: varchar("payment_method", { length: 50 }),
  shippingAddress: jsonb("shipping_address"), // JSON с адресом доставки
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Позиции заказа
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  priceAtTime: decimal("price_at_time", { precision: 10, scale: 2 }).notNull(), // цена на момент заказа
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations для Drizzle
export const phoneBrandsRelations = relations(phoneBrands, ({ many }) => ({
  models: many(phoneModels),
}));

export const phoneModelsRelations = relations(phoneModels, ({ one, many }) => ({
  brand: one(phoneBrands, {
    fields: [phoneModels.brandId],
    references: [phoneBrands.id],
  }),
  compatibility: many(productCompatibility),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.id],
  }),
  children: many(categories),
  products: many(products),
}));

export const productBrandsRelations = relations(productBrands, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(productBrands, {
    fields: [products.brandId],
    references: [productBrands.id],
  }),
  images: many(productImages),
  compatibility: many(productCompatibility),
  orderItems: many(orderItems),
}));

export const productCompatibilityRelations = relations(
  productCompatibility,
  ({ one }) => ({
    product: one(products, {
      fields: [productCompatibility.productId],
      references: [products.id],
    }),
    phoneModel: one(phoneModels, {
      fields: [productCompatibility.phoneModelId],
      references: [phoneModels.id],
    }),
  })
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
