<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Product } from '../business/productService';
import ProductItem from './ProductItem.vue';

const props = defineProps<{ products: Product[] }>();

const itemHeight = 210;
const containerHeight = 700;
const visibleCount = Math.ceil(containerHeight / itemHeight);

const containerRef = ref<HTMLDivElement | null>(null);
const scrollTop = ref(0);

const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight));
const endIndex = computed(() => startIndex.value + visibleCount);
const visibleItems = computed(() =>
  props.products.slice(startIndex.value, Math.min(endIndex.value, props.products.length))
);


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
    <div :style="{ height: topPadding + 'px' }"></div>

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
