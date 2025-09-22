<script lang="ts" setup>
import { navigation } from "@/constants/navigation";
</script>

<template>
  <nav>
    <ul class="flex flex-col gap-1 text-secondary font-normal">
      <li v-for="nav in navigation" :key="nav.name" class="link-accent">
        <NuxtLink :to="nav.href">{{ nav.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style></style>
