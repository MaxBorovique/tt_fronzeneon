<script setup lang="ts">
import PruductsList from './components/ui/ProductsList.vue'
</script>

<template>
  <main>
    <div class="container">
      <PruductsList />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.container {
  max-width: 1248px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}
</style>
