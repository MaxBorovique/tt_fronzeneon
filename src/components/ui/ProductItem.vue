<script setup lang="ts">
import type { Product } from '../business/productService';
defineProps<{ product: Product }>();
</script>

<template>
    <article>
      <div class="image-container">
        <img :src="product.thumbnail" alt="product image" />
      </div>
      <div class="content-container">
        <h2>{{ product.title }}</h2>
        <p class="description">{{ product.description }}</p>
        <div class="discount">
          <span>Discount {{ product.discountPercentage }}</span>
          <span>{{ product.brand }}</span>
        </div>
        <div class="price">
          <span>$ {{ product.price }}</span>
          <span> {{ product.rating }}</span>
          <span>{{ product.category }}</span>
        </div>
      </div>
    </article>
</template>

<style lang="scss" scoped></style>
