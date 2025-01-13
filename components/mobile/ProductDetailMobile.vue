<template>
  <div class="flex flex-col justify-center font-Kumbh-Sans ">
    <!-- Carousel -->
    <UCarousel :items="productthumbnails"
      :prev-button="{ icon: 'i-heroicons-chevron-left-solid', class: 'custom-arrow-button custom-icon-size start-7', size: 'lg' }"
      :next-button="{ icon: 'i-heroicons-chevron-right-solid', class: 'custom-arrow-button end-7', size: 'lg' }" arrows>
      <template #default="{ item }">
        <div class="max-h-[340px]">
          <img :src="item.image" draggable="false" class="w-full h-full object-cover overflow-hidden
           transform origin-top 
           scale-125" />
        </div>
      </template>
    </UCarousel>

    <!-- Description -->
    <div class="informationcard max-w-[500px] mt-6 mx-4">
      <div class="text-xs subtitle font-semibold mb-2">
        SNEAKER COMPANY
      </div>
      <div class="text-2xl font-bold maintitle">
        Fall Limited Edition <br> Sneakers
      </div>
      <div class="mt-2 description">
        These low profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole,
        they'll withstand everything the weather can offer.
      </div>
    </div>
    <!-- Price info -->
    <div class="payementcard mt-6 mx-4">
      <!-- Price card -->
      <div class="actualprice flex items-center justify-between w-full">
        <!-- Bloc de gauche : prix actuel et pourcentage -->
        <div class="flex items-center">
          <div class="text-3xl font-bold">
            ${{ actualprice }}.00
          </div>
          <div class="pourcentage text-md py-0.5 px-2 rounded ml-5">
            {{ pourcentage }}%
          </div>
        </div>

        <!-- Bloc de droite : prix barré -->
        <div class="price line-through subtitle text-md flex items-center">
          ${{ price }}.00
        </div>
      </div>


      <!-- Buy button -->
      <div class="flex flex-col mt-6">
        <!-- Quantity button -->
        <div class="flex justify-around items-center quantity py-3 rounded-md mb-4">
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
        <!-- Add to Cart Button -->
        <div class="flex justify-center items-center py-3 rounded-md cartcard mb-4">
          <UButton class="flex items-center" variant="ghost" @click="$emit('increaseBy', 1, quantity)">
            <img src="/assets/icons/icon-cart.svg" class="icon-cart mr-4">
            Add to cart
          </UButton>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

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

function setQuantity(operation: number) {
  if (quantity.value > 0 && operation === -1) {
    quantity.value -= 1;
  } else if (operation === 1) {
    quantity.value += 1;
  }
}
</script>

<style>
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

.custom-arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: none;
  padding: 10px;
  transition: all 0.3s ease;
  background-color: white;
  color: black;
  width: 50px;
  height: 50px;
  font-size: 40px;
  top: 180px;
}

.custom-arrow-button:disabled {
  color: gray;
  background-color: white;
}

.custom-arrow-button:hover {
  color: hsl(26, 100%, 55%);
}

</style>