import { ref, computed } from 'vue'

export function useVirtualList<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number
) {
  const containerRef = ref<HTMLDivElement | null>(null)
  const scrollTop = ref(0)

  const visibleCount = Math.ceil(containerHeight / itemHeight)

  const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight))
  const endIndex = computed(() => startIndex.value + visibleCount)

  const visibleItems = computed(() =>
    items.slice(startIndex.value, Math.min(endIndex.value, items.length)),
  )

  const topPadding = computed(() => startIndex.value * itemHeight)
  const bottomPadding = computed(
    () =>
      items.length * itemHeight -
      topPadding.value -
      visibleItems.value.length * itemHeight,
  )

  const onScroll = () => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop
    }
  }

  return {
    containerRef,
    visibleItems,
    topPadding,
    bottomPadding,
    onScroll,
  }
}
