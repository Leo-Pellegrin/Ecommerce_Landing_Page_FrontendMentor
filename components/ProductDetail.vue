<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto grid grid-cols-2">
      <div class="grid grid-rows-9 border-2 border-red-500">
        <UCarousel v-slot="{ productimage }" :items="productimages" :ui="{ item: 'basis-full' }"
          class="rounded-lg overflow-hidden" arrows>
          <img :src="productimage" class="w-full" draggable="false">
        </UCarousel>
      </div>
    </div>
    <div class="flex flex-col">
      <div>
        Sneaker Company
      </div>
      <div>
        Fall Limited Edition Sneakers
      </div>
      <div>
        These low-profile sneakers are your perfect casual wear
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

const page = ref(null);

const productimages = ref([
  '/image-product-1.jpg',
  '/image-product-2.jpg',
  '/image-product-3.jpg',
  '/image-product-4.jpg'
])

const productthumbnails = ref([
  '/images/image-product-1-thumbnail.jpg',
  '/images/image-product-2-thumbnail.jpg',
  '/images/image-product-3-thumbnail.jpg',
  '/images/image-product-4-thumbnail.jpg'
])


async function fetchData() {
}

onMounted(() => {
  fetchData();
  console.log(page.value)
})


</script>

<style></style>