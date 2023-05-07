<script setup lang="ts">
const props = defineProps(['disabled', 'color'])

const getClassColor = () => {
  if (props.color === 'ACCENT') {
    return 'border-accent-300 hover:border-accent-400 focus:border-accent-200  active:border-accent-200 bg-accent-300 active:bg-accent-400 hover:bg-accent-400'
  }
  return 'border-secondary-300 hover:border-secondary-400 focus:border-secondary-200  active:border-secondary-200 bg-secondary-300 active:bg-secondary-400 hover:bg-secondary-400'
}
</script>

<template>
  <button
    :disabled="props.disabled"
    type="button"
    :class="
      'box-border rounded-full inline-flex min-w-min items-center justify-center border-[1px] font-normal leading-tight no-underline transition-colors duration-200 ease-in-out  text-light-100 disabled:bg-light-300 disabled:border-light-300 disabled:text-light-500 disabled:pointer-events-none text-xs px-[20px] py-[15px] gap-nano ' +
      getClassColor()
    "
  >
    <slot />
  </button>
</template>

<style lang=""></style>
