<template>
  <AppHeader :cartItems="cartItems" @delete-item="emitDeleteItem"/>
  <ProductDetail @increase-by="emitAddCartItems"/>
</template>

<script setup lang="ts">
const cartItems = ref<number[]>([0, 0, 0])

function emitAddCartItems(id: number, quantity: number){
  cartItems.value[id] += quantity;
}

function emitDeleteItem(id:number){
  cartItems.value[id] = 0;
  console.log(cartItems.value[id])
}

</script>

<style scoped>
* {
  background-color: white;
  color: black;
}

</style>