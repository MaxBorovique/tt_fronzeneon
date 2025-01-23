<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ProductService, type Product } from '../business/productService'
import ProductItem from './ProductItem.vue';

const products = ref<Product[]>([])
const productService = new ProductService()

onMounted(async () => {
  products.value = await productService.fetchProducts();
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
  max-width: 1000px;
  max-height: 800px;
  overflow-y: hidden;
}
.list-item {
  padding-bottom: 1rem;
  list-style: none;
}
</style>
