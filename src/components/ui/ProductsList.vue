<script setup lang="ts">
import type { Product } from '../business/productService';
import ProductItem from './ProductItem.vue';
defineProps<{ products: Product[]}>();
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

<style lang="css" scoped>
.products-list {
  max-width: 1000px;
  max-height: 800px;
  overflow-y: hidden;
}
.list-item {
  padding-bottom: 1rem;
  list-style: none;
  padding: 1.5rem;
  padding-bottom: 0;
}
</style>
