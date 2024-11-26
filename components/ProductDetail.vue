<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="imageContainer mx-auto">
      <!-- Main image -->
      <div class="container mx-auto">
        <div class="border-2 border-red-500 rounded-lg">
          <img :src="imageSelected" class="w-full max-w-[450px] mx-auto" draggable="false">
        </div>
      </div>
      <!-- Subimages -->
      <div class="grid grid-cols-4 mt-8 gap-6">
        <div v-for="(thumbnail, index) in productthumbnails" :key="index" class="mx-auto flex-none max-w-[95px]">
          <img :src="thumbnail.path" class="w-full border-red-500 rounded-lg" @click="imageSelection(index)" />
        </div>
      </div>

    </div>

    <div class="flex flex-col">
      <div class="text-xl">
        Sneaker Company
      </div>
      <div class="text-4xl">
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
  '/images/image-product-4.jpg'
])

const imageSelected = ref('')

const productimagestest = ref([
  'https://picsum.photos/600/600?random=1',
  'https://picsum.photos/600/600?random=2',
  'https://picsum.photos/600/600?random=3',
  'https://picsum.photos/600/600?random=4',
  'https://picsum.photos/600/600?random=5',
  'https://picsum.photos/600/600?random=6'
])

const productthumbnails = ref([
  {
    path: '/image-product-1-thumbnail.jpg',
    selected: false
  },
  {
    path: '/image-product-2-thumbnail.jpg',
    selected: false
  },
  {
    path: '/image-product-3-thumbnail.jpg',
    selected: false
  },
  {
    path: '/image-product-4-thumbnail.jpg',
    selected: false
  }
])

function imageSelection(index: number){
  productthumbnails.value[index].selected = !productthumbnails.value[index].selected;
  imageSelected.value = productimages.value[index]
}

async function fetchData() {
}

onMounted(() => {
  imageSelected.value = productimages.value[0]
})



function thumbnail(value: { path: string; selected: boolean; }, index: number, array: { path: string; selected: boolean; }[]): unknown {
  throw new Error('Function not implemented.');
}
</script>

<style></style>