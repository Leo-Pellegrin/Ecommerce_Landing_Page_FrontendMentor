<script setup lang="ts">

const isCartModalOpen = ref(false);
const isMobileMenuOpen = ref(false);
const modalPositionStyle = ref({});

const props = defineProps({
  cartItems: {
    type: Array as PropType<number[]>,
    required: true,
  },
});

const quantity = computed(() => {
  return props.cartItems.reduce((acc: number, quantity: number) => acc + quantity, 0);
});

const totalPrice = computed(() => {
  const quantityValue = quantity.value;
  if (isNaN(quantityValue)) {
    return "0.00"; // Valeur par défaut si quantity est invalide
  }
  return (125 * quantityValue).toFixed(2);
});

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

function openCartModal(event: any) {
  const buttonRect = event.target.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Coordonnées initiales basées sur le bouton
  let left = buttonRect.left;
  let top = buttonRect.bottom;

  let margin = 16

  // Dimensions estimées de la modal
  const modalWidth = 400; // Ajustez en fonction de la taille réelle de votre modal
  const modalHeight = 300; // Ajustez en fonction de la taille réelle de votre modal

  // Annuler le centrage en flexbox
  left = viewportWidth / 2 - buttonRect.width / 2 - (modalWidth / 2) + margin;

  top = -(viewportHeight / 2) + top + margin;

  // Ajuster pour éviter les débordements horizontaux
  if (left + modalWidth > viewportWidth) {
    left = viewportWidth - modalWidth - 16; // Marge de 16px
  }

  // Ajuster pour éviter les débordements verticaux
  if (top + modalHeight > viewportHeight) {
    top = viewportHeight - modalHeight - 16; // Marge de 16px
  }

  modalPositionStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    position: 'absolute !important',
    transform: 'translate(0, 0) !important', // Annuler tout centrage flex
  };

  isCartModalOpen.value = !isCartModalOpen.value;
}

function getModalSize() {
  const modal = document.querySelector('#headlessui-dialog-panel-v-') as HTMLElement;
  if (modal) {
    return {
      width: modal.offsetWidth,
      height: modal.offsetHeight,
    };
  }
  return { width: 300, height: 400 }; // Valeurs par défaut
}

</script>

<template>
  <header>
    <div class="flex sm:justify-center items-center pt-2 sm:pt-14 px-4 sm:px-24 header">
      <!-- Menu pour mobile -->
      <UButton icon="i-heroicons-bars-3-20-solid" variant="ghost" @click="isMobileMenuOpen = true"
        class="my-auto mr-2 sm:hidden" />
      <USlideover v-model="isMobileMenuOpen" side="left">
        <UCard class="flex flex-col flex-1 max-w-[260px]"
          :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <div class="flex justify-start items-center ">
            <UButton color="black" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square
              @click="isMobileMenuOpen = false" />
          </div>
          <div class="flex flex-col mt-8">
            <UButton v-for="(link, index) in links" :key="index"
              class="border-none"
              variant="ghost">
              <span class="text-base mx-2 text-gray-500 dark:text-gray-400">{{ link.label }}</span>
            </UButton>

          </div>
        </UCard>
      </USlideover>

      <!-- Première div alignée à gauche -->
      <div class="sm:mr-10">
        <svg width="138" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.217 20c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.35-.053c-2.7-.405-3.18-.788-3.18-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.281v-.133c0-2.389-1.35-5.238-7.774-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.223 4.675.21.028.433.054.659.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.797 0-3.784-.593-3.784-1.92v-.134H.002L0 14.926v.317c.008.79.118 1.913 1.057 2.862C2.303 19.362 4.712 20 8.217 20Zm13.21 0v-7.49c0-2.104.547-4.423 4.176-4.423 3.915 0 3.778 2.777 3.768 4.042V20h4.18v-7.768c0-2.264-.176-7.766-6.732-7.766-2.778 0-4.192.911-5.195 2.28h-.197V4.467H17.22V20h4.207Zm21.959 0c5.094 0 7.787-2.07 8.217-5.405H47.53c-.386 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.056-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.099-9.574h-8.188c.486-1.574 1.764-2.431 4.089-2.431 2.994 0 3.755 1.267 4.099 2.431ZM70.499 20V4.457H66.29V6.74h-.176c-1.053-1.377-2.809-2.283-5.677-2.283-6.433 0-7.225 5.293-7.253 7.635v.137c0 2.092.732 7.771 7.241 7.771 2.914 0 4.684-.818 5.734-2.169h.131V20H70.5Zm-8.854-3.623c-3.996 0-4.447-3.032-4.447-4.148 0-1.21.426-4.148 4.455-4.148 3.631 0 4.374 2.044 4.374 4.148 0 2.35-.742 4.148-4.382 4.148ZM88.826 20l-6.529-9.045 6.588-6.488h-5.827l-6.836 6.756V0h-4.187v19.954h4.187V16.94l3.02-2.976L83.6 20h5.226Zm9.9 0c5.094 0 7.786-2.07 8.217-5.405h-4.074c-.387 1.02-1.63 1.72-4.143 1.72-2.721 0-3.962-1.03-4.25-3.106h12.527c.24-2.13-.029-5.417-3.026-7.44v.005c-1.312-.915-3.057-1.465-5.251-1.465-5.24 0-8.336 2.772-8.336 7.845 0 5.17 3.02 7.846 8.336 7.846Zm4.098-9.574h-8.187c.485-1.574 1.763-2.431 4.089-2.431 2.994 0 3.755 1.267 4.098 2.431ZM112.76 20v-6.97c0-2.103.931-4.542 4.05-4.542 1.33 0 2.393.236 2.785.346l.67-3.976c-.728-.16-1.626-.392-2.757-.392-2.665 0-3.622.794-4.486 2.282h-.262V4.466h-4.21V20h4.21Zm17.221 0c4.761 0 7.519-.753 7.519-4.606 0-3.4-3.38-4.172-6.66-4.682l-.56-.085-.279-.041-.349-.053c-2.701-.405-3.181-.788-3.181-1.471 0-.478.49-1.331 2.843-1.331 2.455 0 3.493.647 3.493 1.87v.134h4.282v-.133c0-2.389-1.35-5.238-7.775-5.238-5.952 0-7.201 2.584-7.201 4.752 0 3.097 2.763 4.086 7.224 4.675.21.028.432.054.658.081 1.669.197 3.172.42 3.172 1.585 0 1.01-1.615 1.222-3.298 1.222-2.796 0-3.784-.593-3.784-1.92v-.134h-4.319l-.001.301v.317c.008.79.117 1.913 1.056 2.862 1.246 1.257 3.655 1.895 7.16 1.895Z"
            fill="#1D2026" fill-rule="nonzero" />
        </svg>
      </div>

      <!-- Deuxième div avec les boutons alignés à gauche -->
      <div class="justify-start flex-1 gap-1.5 menu-header">
        <UButton v-for="(link, index) in links" :key="index"
          class="hoverbtn border-none hover:underline hover:decoration-orange-500 hover:decoration-4 underlinebtn"
          variant="ghost">
          <span class="text-md mx-2 text-gray-500 dark:text-gray-400">{{ link.label }}</span>
        </UButton>
      </div>

      <!-- Dernière div alignée à droite -->
      <div class="ml-auto flex">

        <UButton class="relative my-auto sm:mr-10" variant="ghost" @click="openCartModal($event)">
          <UChip :text="quantity" size="2xl" color="orange" :show="quantity > 0" :ui="{ base: 'ring-0' }"
            class="chiptext">
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill="gray" fill-rule="nonzero" />
            </svg>
          </UChip>
        </UButton>

        <UModal v-model="isCartModalOpen" class="mt-2 border-none" :overlay="false">
          <UCard :style="modalPositionStyle"
            class="dark:text-black dark:bg-white border-none custom-modal min-w-[400px] drop-shadow-2xl rounded-b-lg"
            :ui="{ rounded: 'rounded-none', ring: 'ring-0' }">
            <template #header>
              <div class="flex justify-start">
                <span class="text-md font-bold mb-5">Cart</span>
              </div>
              <UDivider :ui="{
                border: {
                  base: ''
                }
              }"></UDivider>
              <div v-if="quantity > 0">
                <div class="flex w-full items-center my-3">
                  <img src="/images/image-product-1-thumbnail.jpg" class="max-w-[60px] mt-3 rounded-lg my-auto">
                  <div class="flex-column ml-5 mt-3 flex-grow">
                    <span class="text-gray-500 mx-auto">Fall limited edition Sneakers</span>
                    <div class="mx-auto">
                      <span class="text-gray-500">$125.00 x {{ quantity }}</span>
                      <span class="font-bold ml-2">${{ totalPrice }}</span>
                    </div>
                  </div>
                  <UButton class="mr-4 mt-4" variant="ghost" size="sm" @click="$emit('deleteItem', 1)">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <defs>
                        <path
                          d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                          id="a" />
                      </defs>
                      <use fill="#C9CBD6" fill-rule="nonzero" xlink:href="#a" />
                    </svg>
                  </UButton>
                </div>
                <UButton class="w-full mt-3 mb-1 bg-purchase-btn" :ui="{ rounded: 'rounded-lg' }">
                  <span class="mx-auto text-lg font-bold my-2">Checkout</span>
                </UButton>
              </div>
              <div v-else class="my-16 flex justify-center items-center w-full">
                <span class="text-center text-gray-500 font-semibold">Your cart is empty.</span>
              </div>
            </template>
          </UCard>
        </UModal>

        <UButton variant="ghost">
          <div class="group my-auto rounded-full">
            <UAvatar src="/images/image-avatar.png" alt="Avatar" size="lg"
              class="rounded-full group-hover:shadow-[0_0_0_2px_rgba(255,87,34,1)] transition-shadow duration-200" />
          </div>
        </UButton>

      </div>
    </div>
    <UDivider class="sm:px-24 mt-2 sm:mt-10" :ui="{
      border: {
        base: ''
      }
    }"></UDivider>
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

.custom-modal {
  position: absolute !important;
  /* Priorité absolue pour écraser le centrage flex */
  margin: 0 !important;
  /* Annule les marges automatiques */
  transform: translate(0, 0) !important;
  /* Neutralise tout centrage */
}

.chiptext * {
  color: white !important;
}

.bg-purchase-btn {
  background-color: #FA7E1D;
}

.bg-purchase-btn:hover {
  background-color: #FA7E1D;
}


@media (min-width: 375px) {
  .header {
    justify-content: start;
  }

  .menu-header {
    display: none;
  }
}
</style>
