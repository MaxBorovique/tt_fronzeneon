<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ITEM_HEIGHT, CONTAINER_HEIGHT } from '../../vars'
import { debounce } from '@/helpers/debounce';
import type { Product } from '@/types/product';
import ProductItem from './ProductItem.vue';

const props = defineProps<{ products: Product[] }>()

const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT)
const overscanCount = 3

const containerRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref(0)

const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / ITEM_HEIGHT) - overscanCount
  return Math.max(0, start)
})

const endIndex = computed(() => {
  const end = startIndex.value + visibleCount + 2 * overscanCount
  return Math.min(end, props.products.length)
})

const visibleItems = computed(() => props.products.slice(startIndex.value, endIndex.value))

const topPadding = computed(() => startIndex.value * ITEM_HEIGHT)
const bottomPadding = computed(() =>
  props.products.length * ITEM_HEIGHT - topPadding.value - visibleItems.value.length * ITEM_HEIGHT
)

const handleScroll = () => {
  if (containerRef.value) {
    requestAnimationFrame(() => {
      scrollTop.value = containerRef.value!.scrollTop
    })
  }
}

const onScroll = debounce(handleScroll, 16)

onMounted(() => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
})
</script>

<template>
  <section
    class="products-list-container"
    ref="containerRef"
    @scroll="onScroll"
  >
    <div
      class="products-viewport"
      :style="{
        transform: `translateY(${topPadding}px)`,
        willChange: 'transform'
      }"
    >
      <transition-group
        name="list"
        tag="ul"
        class="products-list"
      >
        <li
          v-for="product in visibleItems"
          :key="product.id"
          class="list-item"
          :style="{ height: `${ITEM_HEIGHT}px` }"
        >
          <ProductItem :product="product" />
        </li>
      </transition-group>
    </div>
    <div :style="{ height: `${bottomPadding}px` }" />
  </section>
</template>

<style scoped>
.products-list-container {
  position: relative;
  height: 800px;
  overflow-y: auto;
  border-radius: 10px;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--c-gray) var(--c-body-bg);
  will-change: transform;
}

.products-viewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;
}

.products-list {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
}

.list-item {
  list-style: none;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.3s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-move {
  transition: transform 0.3s ease;
}

.products-list-container {
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
}


.products-list-container::-webkit-scrollbar {
  width: 6px;
}

.products-list-container::-webkit-scrollbar-track {
  background: var(--c-body-bg);
  border-radius: 3px;
}

.products-list-container::-webkit-scrollbar-thumb {
  background: var(--c-gray);
  border-radius: 3px;
}

.products-list-container::-webkit-scrollbar-thumb:hover {
  background: var(--c-primary);
}
</style>
