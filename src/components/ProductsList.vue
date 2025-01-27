<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ITEM_HEIGHT, CONTAINER_HEIGHT } from '../../vars'
import { debounce } from '@/helpers/debounce';
import type { Product } from '@/types/product';
import ProductItem from './ProductItem.vue';

const props = defineProps<{ products: Product[] }>()

const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT)

const containerRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref(0)

const startIndex = computed(() => Math.floor(scrollTop.value / ITEM_HEIGHT))
const endIndex = computed(() => startIndex.value + visibleCount)
const visibleItems = computed(() =>
  props.products.slice(startIndex.value, Math.min(endIndex.value, props.products.length)),
)

const topPadding = computed(() => startIndex.value * ITEM_HEIGHT)
const bottomPadding = computed(
  () =>
    props.products.length * ITEM_HEIGHT - topPadding.value - visibleItems.value.length * ITEM_HEIGHT,
)

const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
};


const onScroll = debounce(handleScroll, 50);

onMounted(() => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
})
</script>

<template>
  <section
    class="products-list"
    ref="containerRef"
    @scroll="onScroll"
    style="height: 800px; overflow-y: auto"
  >
    <div :style="{ height: topPadding + 'px' }"></div>

    <transition-group name="fade-slow" tag="ul" class="products-list">
      <li
        class="list-item"
        v-for="product in visibleItems"
        :key="product.id"
        :style="{ height: ITEM_HEIGHT + 'px' }"
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
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.3s ease;
}

.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

.fade-slow-move {
  transition: transform 0.3s ease;
}
</style>
