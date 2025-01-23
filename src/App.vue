<script setup lang="ts">
import AppInput from './components/ui/AppInput.vue';
import ProductsList from './components/ui/ProductsList.vue';
</script>

<template>
  <main>
    <div class="container">
      <AppInput />
      <ProductsList />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100%;
}
.container {
  max-width: 1248px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
