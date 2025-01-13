<script setup lang="ts">

import { useDeviceStore } from '~/stores/device';

// Accéder au store
const deviceStore = useDeviceStore();

onMounted(() => {
  // Mettre à jour le store lors du redimensionnement
  window.addEventListener('resize', deviceStore.updateDevice);
});

const cartItems = ref<number[]>([0, 0, 0])

function emitAddCartItems(id: number, quantity: number) {
  cartItems.value[id] += quantity;
}

function emitDeleteItem(id: number) {
  cartItems.value[id] = 0;
  console.log(cartItems.value[id])
}
</script>

<template>
  <AppHeader :cartItems="cartItems" @delete-item="emitDeleteItem" />

  <Suspense>
    <template #default>
      
       <ProductDetailMobile v-if="deviceStore.isMobile" @increase-by="emitAddCartItems"/>
      <ProductDetailDesktop v-else @increase-by="emitAddCartItems"/>

    </template>
    <template #fallback>
      <div>Chargement...</div>
    </template>
  </Suspense>
</template>