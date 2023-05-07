<script setup lang="ts">
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/atoms/PrimaryButton.vue'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <header class="flex flex-row justify-end">
    <div class="p-4">
      <PrimaryButton @click="logout"> SALIR </PrimaryButton>
    </div>
  </header>
  <main class="grid place-content-center pt-6">
    <slot />
  </main>
</template>
