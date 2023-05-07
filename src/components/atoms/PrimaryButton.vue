<script setup lang="ts">
const props = defineProps(['disabled', 'loading', 'type'])
</script>

<template>
  <button
    :disabled="props.disabled"
    :type="type"
    class="box-border inline-flex min-w-min items-center justify-center rounded border-[1px] font-normal leading-tight no-underline transition-colors duration-200 ease-in-out bg-primary-300 text-light-100 border-primary-300 hover:bg-primary-400 hover:border-primary-400 focus:border-primary-200 active:bg-primary-400 active:border-primary-200 disabled:bg-light-300 disabled:border-light-300 disabled:text-light-500 disabled:pointer-events-none text-xs px-[20px] py-[15px] gap-nano w-full"
  >
    <svg
      v-if="props.loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-light-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>

<style lang=""></style>
