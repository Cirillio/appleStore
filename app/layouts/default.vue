<template>
  <div
    class="flex flex-col min-h-dvh lg:px-32 md:px-24 sm:px-12 max-sm:px-6 xl:px-40"
  >
    <AppHeader />

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
