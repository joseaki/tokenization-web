<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import TextInput from '../components/atoms/TextInput.vue'
import PasswordInput from '../components/atoms/PasswordInput.vue'
import PrimaryButton from '../components/atoms/PrimaryButton.vue'

import { login } from '@/services/commerce.service'

const router = useRouter()
const errorMessage = ref('')
const isLoading = ref(false)
const username = ref('commerce_a')
const password = ref('admin')

const handleLogin = async () => {
  try {
    isLoading.value = true
    const resp = await login(username.value, password.value)
    if (resp.data?.token) {
      localStorage.setItem('token', resp.data.token)
      router.push('/createToken')
      isLoading.value = false
    }
  } catch (error: any) {
    errorMessage.value = error.response.data.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="h-screen grid place-content-center">
    <div class="flex h-screen w-screen flex-col p-4 sm:h-auto sm:w-[28rem] sm:bg-light-100 sm:p-10">
      <div class="mb-16 flex justify-center sm:mb-6">
        <img alt="culqi logo" src="/images/logo.svg" width="120" height="125" />
      </div>
      <div>
        <form class="w-full">
          <div class="mb-6">
            <TextInput v-model="username" label="Usuario" placeholder="commerce_a" type="text" />
          </div>
          <div class="mb-6">
            <PasswordInput v-model="password" label="Contraseña" />
            <div>
              <span class="mt-2 text-xs font-light text-danger-300">
                {{ errorMessage }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <PrimaryButton
              @click="handleLogin"
              :loading="isLoading"
              :disabled="!(username && password) || isLoading"
            >
              INICIAR SESIÓN
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
