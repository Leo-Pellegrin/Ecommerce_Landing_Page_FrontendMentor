<script setup lang="ts">
const nuxtApp = useNuxtApp()

const isCartModalOpen = ref(false);
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

function openCartModal() {
  isCartModalOpen.value = !isCartModalOpen.value
}
</script>

<template>
  <header>
    <div class="flex justify-center items-center pt-14 px-24">
      <!-- Première div alignée à gauche -->
      <div class="mr-10 ">
        <img src="/public/images/logo.svg" />
      </div>

      <!-- Deuxième div avec les boutons alignés à gauche -->
      <div class="flex justify-start flex-1 gap-1.5">
        <UButton v-for="(link, index) in links" :key="index"
          class="hoverbtn border-none hover:underline hover:decoration-orange-500 hover:decoration-4 underlinebtn"
          variant="ghost">
          <span class="text-md mx-2 text-gray-500 dark:text-gray-400">{{ link.label }}</span>
        </UButton>
      </div>

      <!-- Dernière div alignée à droite -->
      <div class="ml-auto flex">
        <UButton class="my-auto mr-10" variant="ghost" @click="openCartModal">
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="gray" fill-rule="nonzero" />
          </svg>
        </UButton>
        <UButton variant="ghost">
          <div class="group my-auto rounded-full">
            <UAvatar src="/images/image-avatar.png" alt="Avatar" size="lg"
              class="rounded-full group-hover:shadow-[0_0_0_2px_rgba(255,87,34,1)] transition-shadow duration-200" />
          </div>
        </UButton>

      </div>
    </div>
    <UDivider class="px-24 mt-10" :ui="{
      border: {
        base: ''
      }
    }"></UDivider>
    <UModal v-model="isCartModalOpen" :overlay="false">
      <UCard class="">
        <template #header>
          <div class="flex justify-start">
            <span class="text-xl font-bold">Cart</span>
          </div>
          <UDivider :ui="{
            border: {
              base: ''
            }
          }"></UDivider>
        </template>

      </UCard>
    </UModal>
  </header>
</template>



<style scoped>
.hoverbtn:hover span {
  color: black;
  transition: color 0.5s ease-in-out;
  transition: border 0.5s ease-in-out;
}

.sticky-header {
  position: sticky;
  left: 0;
  background-color: light-dark(#f8ede8, #121212);
  transition: all 1s ease-in-out;
  /* Transition de l'opacité */
}

.maintitle {
  letter-spacing: -0.05em;
  line-height: 0.5em;
  transform: scaleY(0.1);
}

.underlinebtn {
  text-underline-offset: 3.4em;
}
</style>