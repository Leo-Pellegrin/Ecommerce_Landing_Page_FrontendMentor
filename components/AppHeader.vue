<script setup lang="ts">
const nuxtApp = useNuxtApp()

const links = computed(() => [{
  label: 'Collections',
  to: '#women',
}, {
  label: 'Men',
  to: '#women',
}, {
  label: 'Women',
  to: '#women'
}, {
  label: 'About',
  to: '#women',
}, {
  label: 'Contact',
  to: '#women'
}])

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const showHeader = ref(false)

const handleScroll = () => {
  const scrollY = window.scrollY
  const threshold = 300 // Valeur de scrolly seuil à partir de laquelle le header doit être affiché

  if (scrollY > threshold) {
    showHeader.value = true
  } else {
    showHeader.value = false
  }

}
</script>

<template>
  <header>
    <div>
      <div class="flex items-center mx-6 my-4">
        <span>sneakers</span>
      </div>
      <div class="flex justify-center lg:flex-1 gap-1.5">
        <UButton v-for="(link, index) in links" :key="index"
          class="hoverbtn border-none">
          <span class="text-gray-500 dark:text-gray-400"
            :class="link.label == 'Women' ? 'underline underline-offset-8' : ''">{{ link.label }}</span>
        </UButton>
      </div>

    </div>

  </header>
</template>

<style scoped>
.hoverbtn:hover span {
  color: white;
  transition: all 0.7s ease-in-out;
}

.sticky-header {
  position: sticky;
  left: 0;
  background-color: light-dark(#f8ede8, #121212);
  transition: all 1s ease-in-out;
  /* Transition de l'opacité */
}
</style>