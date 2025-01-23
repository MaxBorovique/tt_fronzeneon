<script setup lang="ts">
import type { Product } from '../business/productService'
defineProps<{ product: Product }>()
</script>

<template>
  <article class="product-item">
    <div class="product-item__container">
      <div class="image-container">
        <img :src="product.thumbnail" alt="product image" />
      </div>
      <div class="content-container">
        <h2 class="title">{{ product.title }}</h2>
        <p class="description">{{ product.description }}</p>
        <div class="product-meta">
          <span class="discount">Discount {{ product.discountPercentage }}</span>
          <span class="brand">{{ product.brand }}</span>
        </div>
        <div class="product-info">
          <span class="price">$ {{ product.price }}</span>
          <span class="rating"> {{ product.rating }}</span>
          <span class="category">{{ product.category }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-item {
  display: flex;
  border: 1px solid red;
  font-family: 'Playfair Display', serif;
  color: var(--c-black);
}

.product-item__container {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.content-container {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 18px;
  font-style: bold;
  padding-top: 1rem;
}

.description {
  font-size: 14px;
  padding-top: 1rem;
  color: var(--c-gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>
