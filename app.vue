<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'light'
</script>

<style scoped>
.nuxt-icon svg {
  width: 4em;
  height: 4em;
}
</style>