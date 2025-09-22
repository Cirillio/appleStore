<script lang="ts" setup>
import type { PhoneModelGroup } from "~/types/product";

defineProps<{
  phoneModels: PhoneModelGroup[];
}>();
</script>

<template>
  <dropdown-menu>
    <dropdown-menu-trigger as-child>
      <Button variant="link" class="cursor-pointer">
        <IPhoneOutline class="i size-6" />
        Выбрать модель телефона
        <ChevronDown class="i size-4" />
      </Button>
    </dropdown-menu-trigger>
    <dropdown-menu-content
      class="pl-3 pr-6 bg-background shadow-sm !border-0 !border-t border-primary min-w-60 !rounded-t-none"
    >
      <accordion collapsible type="multiple" class="font-medium">
        <accordion-item
          v-for="m in phoneModels"
          :key="m.manufacturer.id"
          :value="m.manufacturer.id"
        >
          <accordion-trigger
            class="hover:!no-underline py-3 cursor-pointer text-base"
            >{{ m.manufacturer.name }}</accordion-trigger
          >
          <accordion-content>
            <ul class="flex flex-col gap-0.5 px-3 border-t border-primary py-2">
              <li v-for="p in m.models" :key="p.id" class="link-accent">
                <nuxt-link :to="'/' + m.manufacturer.id + '/' + p.id">{{
                  p.name
                }}</nuxt-link>
              </li>
            </ul>
          </accordion-content>
        </accordion-item>
      </accordion>
    </dropdown-menu-content>
  </dropdown-menu>
</template>

<style></style>
