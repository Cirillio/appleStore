<script lang="ts" setup>
import type { PhoneModelGroup } from "~/types/product";

const phones: PhoneModelGroup[] = [
  {
    manufacturer: {
      id: "apple-09323",
      name: "Apple",
    },
    models: [
      {
        id: "iphone12-98744",
        name: "iPhone 12",
      },
      {
        id: "iphone11-94320",
        name: "iPhone 11",
      },
      {
        id: "iphone13-pro-max-083245",
        name: "iPhone 13 Pro Max",
      },
    ],
  },
];
</script>

<template>
  <header class="flex w-full items-center py-3 gap-6">
    <Logo />

    <PhoneModelSelector :phone-models="phones" />

    <UserActions />
  </header>
</template>
