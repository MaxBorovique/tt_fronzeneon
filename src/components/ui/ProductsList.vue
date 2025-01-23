<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProductService, type Product } from '../business/productService'
import ProductItem from './ProductItem.vue';

const products = ref<Product[]>([])
const productService = new ProductService()

onMounted(async () => {
  products.value = await productService.fetchProducts();
  console.log(products.value);
})
</script>

<template>
  <div>
    <section class="products-list">
      <ul>
        <li class="list-item" v-for="product in products" :key="product.id">
          <ProductItem  :product="product" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.products-list {
  max-width: 800px;
}
.list-item {
  list-style: none;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--c-gray);
  border-radius: 5px;
}
</style>
