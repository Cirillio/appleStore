<template>
  <div class="flex gap-6 ml-auto *:hover:text-accent *:transition-colors">
    <UserAction to="/favorites" :notification="1">
      <template #icon>
        <SolarHeartLinear
          class="i hover:text-accent active:text-accent transition-colors"
        />
      </template>
    </UserAction>
    <UserAction to="/cart" :notification="1">
      <template #icon>
        <SolarCartOutline
          class="i hover:text-accent active:text-accent transition-colors"
        />
      </template>
    </UserAction>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
