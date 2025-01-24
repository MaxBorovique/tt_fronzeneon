<template>
  <div class="input-contaner">
    <label class="label">
      <input
      class="input"
      type="text"
      placeholder="Search for products"
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
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}

.label {
  width: 600px;
  font-size: 1.2rem;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
