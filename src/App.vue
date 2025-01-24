<script setup lang="ts">
import { ProductService } from './components/business/productService'
import AppInput from './components/ui/AppInput.vue'
import ProductsList from './components/ui/ProductsList.vue'
import { computed, onMounted, ref } from 'vue'
import type { Product } from './types/product'
import NotFound from './components/ui/NotFound.vue'

const products = ref<Product[]>([])
const productService = new ProductService()
const searchData = ref<string>('')
const filteredProducts = computed(() => {
  if (!searchData.value) {
    return products.value
  }
  return productService.filterProductsByNames(products.value, searchData.value)
})

onMounted(async () => {
  products.value = await productService.fetchProducts()
})
</script>

<template>
  <main>
    <div class="container">
      <AppInput v-model="searchData" />
      <NotFound v-if="!filteredProducts.length" />
      <ProductsList v-else :products="filteredProducts" />
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  width: 100vw;
  height: 100%;
}
.container {
  width: 700px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
