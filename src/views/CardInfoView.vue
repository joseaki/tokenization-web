<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import TextInput from '@/components/atoms/TextInput.vue'
import PrimaryButton from '@/components/atoms/PrimaryButton.vue'
import MainLayout from '@/components/templates/MainLayout.vue'
import { getCardInfo } from '@/services/card.service'
import { maskString } from '@/lib/stringMethods'

import type { ICardInfoResponse } from '@/interfaces/card.types'
import { CC, CARD_MASK, getCreditCardType } from '@/lib/creditCardValidation'

const cardToken = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const cardMask = ref('')
const logoUrl = ref('/images/unknown.svg')
const cardInfo = ref<ICardInfoResponse | undefined>(undefined)

const handleSubmit = async () => {
  if (cardToken.value.length < 16) {
    errorMessage.value = 'Token debe tener 16 caracteres'
    return
  }
  try {
    cardInfo.value = undefined
    errorMessage.value = ''
    logoUrl.value = '/images/unknown.svg'
    isLoading.value = true
    const resp = await getCardInfo(cardToken.value)
    if (resp.data) {
      cardInfo.value = resp.data
      const ccType = getCreditCardType(resp.data.card_number.toString())
      cardMask.value = CARD_MASK[ccType ?? 'VISA']
      switch (ccType) {
        case CC.VISA:
          logoUrl.value = '/images/visa.svg'
          break
        case CC.MASTERCARD:
          logoUrl.value = '/images/mastercard.svg'
          break
        case CC.AMEX:
          logoUrl.value = '/images/amex.svg'
          break
        case CC.DINERS:
          logoUrl.value = '/images/diners.svg'
          break
        case CC.DISCOVER:
          logoUrl.value = '/images/discover.svg'
          break
        default:
          logoUrl.value = '/images/unknown.svg'
          break
      }
    }
  } catch (error: any) {
    errorMessage.value = error.response.data.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <MainLayout>
    <div
      class="relative flex flex-col justify-center p-4 bg-light-300 rounded-lg w-screen sm:w-[28rem] h-60 sm:p-10"
    >
      <div class="pt-16">
        <p class="font-semibold text-2xl [word-spacing:0.5rem]">
          {{
            cardInfo?.card_number
              ? maskString(cardInfo?.card_number.toString(), cardMask, { X: /[0-9]/ })
              : 'XXXX XXXX XXXX XXXX'
          }}
        </p>
        <P class="align-center text-lg pt-4">
          Vence {{ cardInfo?.expiration_month ?? 'XX' }}/{{
            cardInfo?.expiration_year.substring(2) ?? 'XX'
          }}
        </P>
      </div>
      <div class="absolute bottom-0 right-0 pb-2 pr-4">
        <img alt="logo tarjeta" :src="logoUrl" width="70" height="50" />
      </div>
    </div>
    <div class="flex h-screen w-screen flex-col p-4 sm:h-auto sm:w-[28rem] sm:bg-light-100 sm:p-10">
      <form @submit.prevent="handleSubmit">
        <div class="pb-6">
          <TextInput
            v-model="cardToken"
            label="Ingresa el token generado"
            type="text"
            inputmode="text"
            maxlength="16"
            placeholder="ej. x876ahdAs9da3SsF"
          />
          <span class="mt-2 text-xs font-light text-danger-300">
            {{ errorMessage }}
          </span>
        </div>
        <PrimaryButton :loading="isLoading" :disabled="isLoading" type="submit">
          OBTENER INFORMACIÓN DE TARJETA
        </PrimaryButton>
      </form>
      <p class="pt-6">
        Si no tienes un token, genera uno
        <RouterLink to="/createToken" class="text-accent-300">acá</RouterLink>
      </p>
    </div>
  </MainLayout>
</template>
