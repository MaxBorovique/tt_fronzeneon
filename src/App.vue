<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import AppInput from './components/ui/AppInput.vue';
import ProductsList from './components/ui/ProductsList.vue';
import { ProductService } from './components/business/productService';
import type { Product } from './types/product';
import NotFound from './components/ui/NotFound.vue';
import { debounce } from './helpers/debounce';

const products = ref<Product[]>([]);
const searchData = ref<string>('');

const updateSearch = debounce((value: string) => {
  searchData.value = value;
}, 300);

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
      <AppInput v-model="searchData" @input="updateSearch" />
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
