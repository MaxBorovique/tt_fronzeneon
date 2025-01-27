<template>
  <div class="input-contaner">
    <label for="product-search" class="label">
      <input
      id="product-search"
      class="input"
      type="search"
      placeholder="Search for products"
      role="searchbox"
      :value="modelValue"
      @input="updateValue"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>()
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<style lang="css" scoped>
.input-contaner {
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
}

.label {
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  padding-bottom: 24px;

}

.input {
  background-color: var(--c-black);
  width: 100%;
  height: 48px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--c-black);
  color: var(--c-gray);
}

.input:focus {
  outline: none;
  border: 1px solid var(--c-primary);
}
</style>
