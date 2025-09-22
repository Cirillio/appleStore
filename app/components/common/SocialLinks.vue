<script lang="ts" setup>
import { socialLinks } from "~/constants/social-links";
</script>

<template>
  <div class="flex gap-3">
    <a
      v-for="socialLink in socialLinks"
      :key="socialLink.alt"
      :href="socialLink.link"
      target="_blank"
    >
      <component
        :is="socialLink.icon"
        class="size-6 hover:text-accent transition-colors"
      />
    </a>
  </div>
</template>

<style scoped>
.social-link {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.social-link:hover {
  opacity: 0.8;
}
</style>
