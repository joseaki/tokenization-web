<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['label', 'placeholder', 'modelValue'])
defineEmits(['update:modelValue'])

const showPassword = ref(false)
const passwordPicture = ref('/public/images/eye.svg')

const handlePasswordClick = () => {
  passwordPicture.value = showPassword.value
    ? '/public/images/eye.svg'
    : '/public/images/eyeClosed.svg'
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex flex-col text-light-100" inputmode="email">
    <label :for="props.label" class="mb-1 text-micro font-medium text-plate-400">
      {{ props.label }}
    </label>
    <div class="relative block">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        enterkeyhint="enter"
        :id="props.label"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder ?? '••••••••••'"
        data-has-icon="true"
        class="py-3 px-4 rounded w-full border font-normal h-12 text-xs bg-light-200 placeholder:text-light-500 text-plate-400 hover:border-light-400 focus:border-primary-300 border-light-200"
        aria-invalid="false"
        aria-describedby="false"
      />
      <button
        @click="handlePasswordClick"
        type="button"
        class="absolute right-4 top-2/4 -translate-y-1/2 text-primary-300"
      >
        <img alt="ver contraseña" :src="passwordPicture" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<style lang=""></style>
