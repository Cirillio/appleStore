<script lang="ts" setup></script>

<template>
  <dropdown-menu>
    <dropdown-menu-trigger as-child>
      <Button variant="link" class="cursor-pointer">
        <Solar icon="iphone-line-duotone" class="size-6 text-primary/50" />
        Выбрать модель телефона
        <Solar icon="alt-arrow-down-line-duotone" class="size-4" />
      </Button>
    </dropdown-menu-trigger>
    <dropdown-menu-content
      class="pl-3 pr-6 bg-background shadow-sm !border-0 !border-t border-primary min-w-60 !rounded-t-none"
    >
      <accordion collapsible type="multiple" class="font-medium">
        <accordion-item value="apple">
          <accordion-trigger
            class="hover:!no-underline py-3 cursor-pointer text-base"
            >Apple</accordion-trigger
          >
          <accordion-content>
            <ul class="flex flex-col gap-0.5 px-3 border-t border-primary py-2">
              <li class="link-accent">
                <nuxt-link to="/apple/iphone-12">iPhone 12</nuxt-link>
              </li>
            </ul>
          </accordion-content>
        </accordion-item>
      </accordion>
    </dropdown-menu-content>
  </dropdown-menu>
</template>

<style></style>
