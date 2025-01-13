<template>
  <div class="hidden min-h-screen sm:flex sm:items-center sm:justify-center font-Kumbh-Sans -mt-20 ">
    <div class="imageContainer mx-auto">
      <!-- Main image -->
      <div class="container mx-auto" @click="openCarousel()">
        <img :src="imageSelected" class="w-full max-w-[450px] mx-auto rounded-[18px]" draggable="false">
      </div>

      <UModal v-model="isCarouselOpen">
        <div class="flex items-center justify-end">
          <UButton color="white" variant="ghost" icon="i-heroicons-x-mark-solid" size="xl"
            class="mb-3 -mr-2 hover:bg-transparent dark:hover:bg-transparentr modal-button-close"
            @click="isCarouselOpen = false" />
        </div>
        <div>
          <UCarousel :items="productthumbnails" :ui="{
            indicators: {
              wrapper: 'relative bottom-0 mt-4'
            }
          }"
            :prev-button="{ icon: 'i-heroicons-chevron-left-solid', class: 'custom-arrow-button custom-icon-size -start-7', size: 'xl' }"
            :next-button="{ icon: 'i-heroicons-chevron-right-solid', class: 'custom-arrow-button -end-7', size: 'xl' }"
            arrows indicators>
            <template #default="{ item }">
              <img :src="item.image" draggable="false" class="max-w-[515px] rounded-2xl" />
            </template>

            <!-- Template pour les indicateurs (miniatures) -->
            <template #indicator="{ onClick, page, active }">
              <div class="mt-4 bg-white rounded-[20px]" :class="{
                'relative': true,
                'border-4 border-orange-500': active
              }">
                <img :src="productthumbnails[page - 1].path" :class="{
                  'max-w-[100px] rounded-[16px] min-w-6 justify-center': true,
                  'opacity-50': active   // Opacité réduite pour l'image inactif
                }" @click="onClick(page)" class="cursor-pointer hover:opacity-50 transition-opacity" />

              </div>
            </template>
          </UCarousel>
        </div>
      </UModal>
      <!-- Subimages -->
      <div class="grid grid-cols-4 mt-8 gap-4">
        <div v-for="(thumbnail, index) in productthumbnails" :key="index" class="mx-auto flex-none max-w-[95px]">
          <img :src="thumbnail.path" class="w-full rounded-[16px]"
            :class="{ 'border-4 border-orange-500 opacity-50': thumbnail.selected }" @click="imageSelection(index)" />
        </div>
      </div>
    </div>



    <div class="mx-auto">
      <!-- Title and description -->
      <div class="informationcard max-w-[500px]">
        <div class="text-sm subtitle font-semibold mb-4">
          SNEAKER COMPANY
        </div>
        <div class="text-5xl font-bold maintitle">
          Fall Limited Edition Sneakers
        </div>
        <div class="text-md description mt-9">
          These low profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole,
          they'll withstand everything the weather can offer.
        </div>
      </div>
      <!-- Payement card -->
      <div class="payementcard mt-6">
        <!-- Price card -->
        <div class="actualprice flex items-center">
          <div class="text-4xl font-bold">
            ${{ actualprice }}.00
          </div>
          <div class="pourcentage text-md py-0.5 px-2 rounded ml-5">
            {{ pourcentage }}%
          </div>
        </div>

        <div class="price line-through subtitle mt-4 text-md">
          ${{ price }}.00
        </div>
        <!-- Buy button -->
        <div class="grid grid-cols-7 gap-2 mt-6 mr-16">
          <div class="col-span-3 flex justify-center items-center quantity py-3 rounded-md">
            <div class="mx-5" @click="setQuantity(-1)">
              <img src="/assets/icons/icon-minus.svg">
            </div>
            <div class="mx-5">
              {{ quantity }}
            </div>
            <div class="mx-5" @click="setQuantity(1)">
              <img src="/assets/icons/icon-plus.svg">
            </div>
          </div>
          <div class="col-span-4 flex justify-center items-center py-3 rounded-md cartcard">
            <UButton class="flex items-center" variant="ghost" @click="$emit('increaseBy', 1, quantity)"> 
              <img src="/assets/icons/icon-cart.svg" class="icon-cart mr-4">
              Add to cart
            </UButton>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

const productimages = ref([
  '/image-product-1.jpg',
  '/image-product-2.jpg',
  '/image-product-3.jpg',
  '/images/image-product-4.jpg'
])

const imageSelected = ref('')

const price = ref(250)
const actualprice = ref(125)
const pourcentage = ref(50)
const isCarouselOpen = ref(false)

watch(pourcentage, (newValue: number, oldValue: number) => {
  actualprice.value = price.value / (pourcentage.value / 100)
});

const quantity = ref(0);

const productthumbnails = ref([
  {
    image: '/image-product-1.jpg',
    path: '/image-product-1-thumbnail.jpg',
    selected: true
  },
  {
    image: '/image-product-2.jpg',
    path: '/image-product-2-thumbnail.jpg',
    selected: false
  },
  {
    image: '/image-product-3.jpg',
    path: '/image-product-3-thumbnail.jpg',
    selected: false
  },
  {
    image: '/image-product-4.jpg',
    path: '/image-product-4-thumbnail.jpg',
    selected: false
  }
])

function imageSelection(index: number) {
  productthumbnails.value.forEach((p: any) => p.selected = false)
  productthumbnails.value[index].selected = !productthumbnails.value[index].selected;
  imageSelected.value = productimages.value[index]
}

function openCarousel() {
  isCarouselOpen.value = true
}

function selectThumbnail(index: any) {
  console.log()
  // productthumbnails.value.forEach((thumbnail: any, i: any) => {
  //   thumbnail.selected = i === index; // L'élément sélectionné devient "true", les autres sont "false"
  // });
}

onMounted(() => {
  imageSelected.value = productimages.value[0]
})

function thumbnail(value: { path: string; selected: boolean; }, index: number, array: { path: string; selected: boolean; }[]): unknown {
  throw new Error('Function not implemented.');
}

function setQuantity(operation: number) {
  if (quantity.value > 0 && operation === -1) {
    quantity.value -= 1;
  } else if (operation === 1) {
    quantity.value += 1;
  }
}
</script>

<style scoped>
* {
  font-family: 'Kumbh Sans', sans-serif;
}

.subtitle {
  color: hsl(219, 9%, 45%);
  letter-spacing: 0.05em;
}

.maintitle .subtitle .description {
  font-weight: 700;
}

.maintitle {
  color: hsl(220, 13%, 13%)
}

.description {
  color: hsl(220, 14%, 75%)
}

.pourcentage {
  background-color: hsl(220, 13%, 13%);
  color: white;
}

.quantity {
  background-color: #F7F7FF;
}

.cartcard {
  background-color: #FF7D1C;
  color: black;
  font-size: medium;
}

.icon-cart {
  height: 15px;
  width: 17px;
}

.nuxt-icon svg {
  width: 0em;
  height: 0em;
}

.custom-arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s ease;
  background-color: white;
  color: black;
  width: 50px;
  height: 50px;
  font-size: 40px;
  top: 255px;
}

.custom-arrow-button:hover,
.modal-button-close:hover {
  color: hsl(26, 100%, 55%);
}

[id^="headlessui-dialog-panel-v"] {
  background: transparent !important;
  box-shadow: none !important;
}
</style>