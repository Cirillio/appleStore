<template>
  <nuxt-link :to="to" class="relative h-fit w-fit">
    <Solar
      :icon="icon"
      class="size-6 text-secondary hover:text-accent cursor-pointer transition-colors"
    />
    <div
      v-if="notification"
      class="bg-accent size-4 select-none flex rounded-full -top-1 -right-2 text-xs items-center justify-center absolute text-white font-medium"
    >
      {{ notification }}
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  notification: {
    type: Number,
    required: false,
  },
});
</script>

<style></style>
