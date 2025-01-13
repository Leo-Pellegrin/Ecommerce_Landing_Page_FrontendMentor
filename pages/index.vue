<script setup lang="ts">

import { useDeviceStore } from '~/stores/device';

// Accéder au store
const deviceStore = useDeviceStore();

onMounted(() => {
  // Mettre à jour le store lors du redimensionnement, vérifier si on est dans le navigateur
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', deviceStore.updateDevice);
    deviceStore.updateDevice(); // Mettre à jour la taille au montage
  }
});

onBeforeUnmount(() => {
  // Supprimer l'événement de resize lorsque le composant est détruit
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', deviceStore.updateDevice);
  }
});

const cartItems = ref<number[]>([0, 0, 0]);

function emitAddCartItems(id: number, quantity: number) {
  console.log("add to cart", quantity)
  cartItems.value[id] += quantity;
}

function emitDeleteItem(id: number) {
  cartItems.value[id] = 0;
  console.log(cartItems.value[id]);
}
</script>

<template>
  <AppHeader :isMobile="deviceStore.isMobile" :cartItems="cartItems" @delete-item="emitDeleteItem" />

  <div >
    <ProductDetailMobile v-if="deviceStore.isMobile" @increase-by="emitAddCartItems"/>
    <ProductDetailDesktop v-else @increase-by="emitAddCartItems" class="mt-36"/>
  </div>



</template>