<template>
  <section class="not-found">
    <h1 class="title">Card Not Found We couldn&rsquo;t find the card you&rsquo;re looking for.</h1>
    <p class="text">
      However, we have many other products available in our catalog! Take a look &ndash; you&rsquo;re sure to
      find something that suits your needs.
    </p>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.not-found {
  text-align: center;
  color: var(--c-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 600px;
}
.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.text {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
