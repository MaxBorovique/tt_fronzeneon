<script setup lang="ts">
import type { Product } from '@/types/product';

defineProps<{ product: Product }>()
</script>

<template>
  <article class="product-item">
    <div class="image-container">
      <img class="image" :src="product.thumbnail" alt="product image" />
    </div>
    <div class="content-container">
      <div class="product-info">
        <span class="brand">{{ product.brand }}</span>
        <span class="category">{{ product.category }}</span>
      </div>
      <h2 class="title">{{ product.title }}</h2>
      <p class="description">{{ product.description }}</p>

      <div class="product-meta">
        <span class="rating"> {{ product.rating }}</span>
        <div class="pricing">
          <span class="discount">Discount {{ product.discountPercentage }}%</span>
          <span class="price">&#36; {{ product.price }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="css" scoped>
.product-item {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  height: 200px;
  width: 100%;
  background-color: var(--c-black);
  border-radius: 12px;
}

.image-container {
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 450px;
  padding: 16px;
}

.product-info {
  display: flex;
  justify-content: space-between;
}

.brand {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-primary);
  line-height: 22px;
}
.category {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: var(--c-secondary);
  text-transform: capitalize;
  background-color: var(--c-primary);
  padding: 4px 8px;
  border-radius: 100px;
  color: var(--c-black);
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--c-white);
  line-height: 33px;
}

.description {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--c-secondary);
  font-size: 1rem;
  font-weight: 400;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
}
.pricing {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount {
  font-size: 1rem;
  font-weight: 400;
  line-height: 22px;
  color: var(--c-gray);
}

.price {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: var(--c-white);
}

.rating {
  font-style: 1rem;
  font-weight: 400;
  line-height: 22px;
  color: var(--c-gray);
}

.rating::before {
  content: '⭐️';
  color: var(--c-primary);
}
</style>
