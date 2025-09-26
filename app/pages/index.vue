<script lang="ts" setup>
useHead({
  title: "Catalog",
});

const { fetchCatalog } = useCatalogStore();
const { catalogProducts, error, loading } = storeToRefs(useCatalogStore());

onMounted(async () => {
  try {
    await fetchCatalog();
  } catch (e) {
    console.error("Failed to load products:", e);
  }
});
</script>

<template>
  <div v-auto-animate class="w-full flex flex-col gap-3 flex-1">
    <NuxtLink
      to="/error"
      class="link-accent text-xl group flex items-center gap-1.5 font-semibold text-secondary w-fit"
    >
      <span class="transition-all duration-300">Наушники</span>
      <span
        class="iconify opacity-0 group-hover:opacity-100 transition-all duration-300 solar--arrow-right-outline size-4"
      ></span>
    </NuxtLink>
    <div
      v-if="loading && !error"
      class="flex flex-col w-full h-full text-secondary items-center justify-center gap-1"
    >
      <BoxLinear class="size-14 box-rotating" />
      <span class="dots-load flex gap-6 font-extrabold text-2xl">
        <span class="dot-load">.</span>
        <span class="dot-load">.</span>
        <span class="dot-load">.</span>
      </span>
    </div>
    <div
      v-else-if="error"
      class="flex flex-col w-full h-full items-center justify-center gap-2"
    >
      <span class="text-lg font-semibold">Ошибка загрузки</span>
      <span class="text-sm">{{ error }}</span>
      <Button @click="fetchCatalog" variant="outline" class="mt-2">
        Попробовать снова
      </Button>
    </div>
    <div
      v-auto-animate
      v-else-if="!loading && !error && catalogProducts.length > 0"
      class="!grid md:grid-cols-3 min-[462px]:grid-cols-2 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-1 md:gap-2 lg:gap-4 2xl:gap-6 w-full"
    >
      <Card
        v-for="product in catalogProducts"
        :key="product.id"
        class="hover:-translate-y-1 transition-all max-2xl:py-4 shadow-none hover:shadow-md border-transparent hover:border-primary/50"
      >
        <CardContent class="max-2xl:px-4">
          <div class="flex flex-col gap-3">
            <NuxtLink
              v-if="product.images?.length"
              class="aspect-square flex ring transition-all ring-transparent hover:ring-border rounded-md overflow-hidden p-6"
              :to="
                product.brand
                  ? '/' + product.brand?.id + '/' + product.id
                  : '/' + product.id
              "
            >
              <img
                class="object-contain object-center w-full h-full"
                :src="product.images[0]?.url"
                :alt="product.images[0]?.altText || undefined"
              />
            </NuxtLink>
            <div class="flex flex-col text-base gap-3">
              <NuxtLink
                :to="
                  product.brand
                    ? '/' + product.brand?.id + '/' + product.id
                    : '/' + product.id
                "
              >
                <p
                  class="line-clamp-2 font-bold h-12 hover:opacity-50 transition-opacity"
                >
                  {{ product.name }}
                </p>
              </NuxtLink>
              <div class="flex gap-1 items-center">
                <span class="font-semibold mr-auto text-nowrap text-accent"
                  >{{ product.price }} Р</span
                >
                <span
                  class="iconify text-accent/75 mb-0.5 solar--star-bold size-4"
                ></span>
                <span class="font-medium">{{ 4.5 }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div
      v-else-if="!loading && !error && catalogProducts.length === 0"
      class="flex flex-col w-full h-full text-secondary items-center justify-center gap-2"
    >
      <span class="text-lg font-semibold">Товары не найдены</span>
      <Button @click="fetchCatalog" variant="outline" class="mt-2">
        Обновить
      </Button>
    </div>
    <NuxtLink
      to="/earpods"
      class="w-full grid"
      v-if="!loading && !error && catalogProducts.length > 0"
    >
      <Button size="lg" class="cursor-pointer">Смотреть все</Button>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* Исправленная анимация вращения */
@keyframes boxRotating {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.box-rotating {
  animation: boxRotating var(--anim-box-rotating-duration, 2s) linear infinite;
  transform-origin: center;
}

@keyframes dotLoad {
  0% {
    transform: translateX(-8px);
    opacity: 0;
  }
  50% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(8px);
    opacity: 0;
  }
}

.dot-load {
  opacity: 1;
  animation: dotLoad var(--anim-dot-load-duration) ease-in-out infinite;
}

.dots-load .dot-load:nth-child(1) {
  animation-delay: calc(var(--anim-dot-load-duration) / 3 * 1);
}

.dots-load .dot-load:nth-child(2) {
  animation-delay: calc(var(--anim-dot-load-duration) / 3 * 2);
}

.dots-load .dot-load:nth-child(3) {
  animation-delay: calc(var(--anim-dot-load-duration) / 3 * 3);
}
</style>
