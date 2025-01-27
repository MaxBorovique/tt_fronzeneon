<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Product } from './types/product';
import { ProductService } from './services/productService';
import NotFound from './components/NotFound.vue';
import ProductsList from './components/ProductsList.vue';
import AppInput from './components/AppInput.vue';

const products = ref<Product[]>([]);
const searchData = ref<string>('');

const productService = new ProductService();

const filteredProducts = computed(() =>
  productService.filterProductsByNames(products.value, searchData.value)
);

onMounted(async () => {
  products.value = await productService.fetchProducts();
});
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

<style scoped>
.main {
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
