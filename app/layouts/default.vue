<template>
  <div class="flex flex-col px-40">
    <header class="flex w-full items-center py-3 gap-6">
      <span class="font-bold text-3xl text-primary">QPICK</span>
      <div class="flex gap-1 items-center">
        <dropdown-menu>
          <dropdown-menu-trigger as-child>
            <Button variant="link" class="cursor-pointer">
              <Solar
                icon="iphone-line-duotone"
                class="size-6 text-primary/50"
              />
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
                  <ul
                    class="flex flex-col gap-0.5 px-3 border-t border-primary py-2"
                  >
                    <li
                      class="cursor-pointer hover:text-accent transition-colors"
                    >
                      <nuxt-link to="/apple/iphone-12">iPhone 12</nuxt-link>
                    </li>
                  </ul>
                </accordion-content>
              </accordion-item>
            </accordion>
          </dropdown-menu-content>
        </dropdown-menu>
      </div>
      <div class="flex gap-6 ml-auto">
        <nuxt-link class="relative h-fit w-fit">
          <Solar
            icon="heart-outline"
            class="size-6 text-secondary hover:text-accent cursor-pointer transition-colors"
          />
          <div
            class="bg-accent size-4 flex rounded-full -top-1 -right-2 text-xs items-center justify-center absolute text-white font-medium"
          >
            1
          </div>
        </nuxt-link>
        <nuxt-link class="relative h-fit w-fit">
          <Solar
            icon="bag-linear"
            class="size-6 text-secondary hover:text-accent cursor-pointer transition-colors"
          />
          <div
            class="bg-accent size-4 flex rounded-full -top-1 -right-2 text-xs items-center justify-center absolute text-white font-medium"
          >
            1
          </div>
        </nuxt-link>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
