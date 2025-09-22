<script lang="ts" setup></script>

<template>
  <footer
    class="flex w-full justify-between p-7 mt-auto gap-6 bg-secondary-foreground rounded-t-xl shadow-md"
  >
    <Logo />
    <FooterNavigation />

    <div class="flex flex-col gap-6 items-center">
      <NuxtLink class="link-accent"> Условия сервиса </NuxtLink>
      <AppLanguage />
    </div>

    <SocialLinks />
  </footer>
</template>
