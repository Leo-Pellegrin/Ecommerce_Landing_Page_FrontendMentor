<script setup lang="ts">

const isCartModalOpen = ref(false);
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
  const quantityValue = parseFloat(quantity.value);
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

        <UButton class="relative my-auto mr-10" variant="ghost" @click="openCartModal($event)">
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
    <UDivider class="px-24 mt-10" :ui="{
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
</style>
