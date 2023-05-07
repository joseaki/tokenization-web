<script setup lang="ts">
const props = defineProps([
  'label',
  'placeholder',
  'type',
  'value',
  'modelValue',
  'inputmode',
  'pattern',
  'maxlength'
])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col flex-1 text-light-100" inputmode="email">
    <label :for="props.label" class="mb-1 text-micro font-medium text-plate-400">
      {{ props.label }}
    </label>
    <div class="relative block">
      <input
        :value="modelValue ?? props.value"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="py-3 px-4 rounded w-full border font-normal h-12 text-xs bg-light-200 placeholder:text-light-500 text-plate-400 hover:border-light-400 focus:border-primary-300 border-light-200"
        :inputmode="props.inputmode"
        :id="props.label"
        :type="props.type"
        :placeholder="props.placeholder"
        :pattern="pattern"
        :maxlength="maxlength"
        data-has-icon="false"
        aria-invalid="false"
        aria-describedby="false"
      />
    </div>
  </div>
</template>

<style lang=""></style>
