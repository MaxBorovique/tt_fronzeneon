<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Product } from '../business/productService';
import ProductItem from './ProductItem.vue';

const props = defineProps<{ products: Product[] }>();

// Фіксована висота одного елемента (в пікселях)
const itemHeight = 220; // висота `product-item` + відступи
const containerHeight = 800; // висота видимого контейнера
const visibleCount = Math.ceil(containerHeight / itemHeight); // кількість елементів, які видно одночасно

const containerRef = ref<HTMLDivElement | null>(null);
const scrollTop = ref(0); // позиція скролу

const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight));
const endIndex = computed(() => startIndex.value + visibleCount);
const visibleItems = computed(() =>
  props.products.slice(startIndex.value, Math.min(endIndex.value, props.products.length))
);

// Висота "пустого простору" перед і після видимих елементів
const topPadding = computed(() => startIndex.value * itemHeight);
const bottomPadding = computed(
  () => props.products.length * itemHeight - topPadding.value - visibleItems.value.length * itemHeight
);

const onScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
};

onMounted(() => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
});
</script>

<template>
  <section
    class="products-list"
    ref="containerRef"
    @scroll="onScroll"
    style="height: 800px; overflow-y: auto;"
  >
    <!-- Пустий простір перед видимими елементами -->
    <div :style="{ height: topPadding + 'px' }"></div>

    <!-- Видимі елементи -->
    <transition-group name="fade" tag="ul" class="products-list">
      <li
        class="list-item"
        v-for="product in visibleItems"
        :key="product.id"
        :style="{ height: itemHeight + 'px' }"
      >
        <ProductItem :product="product" />
      </li>
    </transition-group>

    <!-- Пустий простір після видимих елементів -->
    <div :style="{ height: bottomPadding + 'px' }"></div>
  </section>
</template>

<style scoped>
.products-list {
  border-radius: 10px;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--c-gray) var(--c-body-bg);
  max-height: 600px;
}
.list-item {
  list-style: none;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>
