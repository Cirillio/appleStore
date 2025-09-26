<template>
  <div
    class="flex flex-col gap-3 min-h-dvh lg:px-20 md:px-12 sm:px-6 max-sm:px-3 xl:px-32 2xl:px-60"
  >
    <AppHeader />

    <main class="flex-1 flex">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "%s - QPICK",
});
</script>

<style></style>
