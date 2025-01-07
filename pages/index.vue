<template>
  <AppHeader :cartItems="cartItems"/>
  <ProductDetail @increase-by="emitAddCartItems"/>
</template>

<script setup lang="ts">
const cartItems = ref<number[]>([0, 0, 0])

function emitAddCartItems(id: number, quantity: number){
  cartItems.value[id] += quantity;
  console.log(cartItems.value)
}
</script>

<style scoped>
* {
  background-color: white;
  color: black;
}

</style>