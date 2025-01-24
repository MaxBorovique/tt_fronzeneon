<script setup lang="ts">
import { onMounted } from 'vue'
import ProductItem from '../business/ProductItem.vue'
import type { Product } from '@/types/product'
import { CONTAINER_HEIGHT, ITEM_HEIGHT } from '../../../vars'
import { useVirtualList } from '@/hooks/useVirtualList'

const props = defineProps<{ products: Product[] }>()

const { containerRef, topPadding, bottomPadding, visibleItems, onScroll } = useVirtualList(
  props.products,
  CONTAINER_HEIGHT,
  ITEM_HEIGHT,
)

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
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
