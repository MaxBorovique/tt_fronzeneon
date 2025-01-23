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
    <section>
      <ul>
        <li v-for="product in products" :key="product.id">
          <ProductItem  :product="product" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
