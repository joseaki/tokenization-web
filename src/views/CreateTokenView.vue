<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TextInput from '@/components/atoms/TextInput.vue'
import PrimaryButton from '@/components/atoms/PrimaryButton.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import MainLayout from '@/components/templates/MainLayout.vue'
import { ref } from 'vue'
import type { TextInputEvent } from '@/interfaces/common.types'
import { maskString } from '@/lib/stringMethods'
import { CARD_MASK, CC, getCreditCardType, validateCard } from '@/lib/creditCardValidation'
import { createToken } from '@/services/card.service'

let firstValidation = false
const cardNumber = ref('')
const cardType = ref<CC | undefined>()
const validationLength = ref('19')
const cvvNumber = ref('')
const date = ref('')
const email = ref('')
const isLoading = ref(false)
const isCopied = ref(false)
const errorMessage = ref('')
const createdToken = ref('')
const errors = ref({
  cardNumber: '',
  date: '',
  cvvNumber: '',
  email: ''
})

const handleCardChange = (event: TextInputEvent) => {
  const textValue = event.target.value
  const mask = CARD_MASK[cardType.value ?? 'VISA']
  const maskedString = maskString(textValue, mask, { X: /[0-9]/ })
  cardType.value = getCreditCardType(maskedString.trim().replace(/ /g, ''))
  validationLength.value = mask.length.toString() ?? '19'
  cardNumber.value = maskedString
  validateForm()
}

const handleExpirationDateChange = (event: TextInputEvent) => {
  const textValue = event.target.value
  const maskedString = maskString(textValue, 'XX/XX', { X: /[0-9]/ })
  date.value = maskedString.trim()
  validateForm()
}

const handleCVVChange = (event: TextInputEvent) => {
  const textValue = event.target.value
  const maskedString = maskString(textValue, 'XXXX', { X: /[0-9]/ })
  cvvNumber.value = maskedString.trim()
  validateForm()
}

const handleEmailChange = (event: TextInputEvent) => {
  const textValue = event.target.value
  email.value = textValue.trim()
  validateForm()
}

const validateForm = () => {
  if (!firstValidation) return
  errors.value = validateCard(
    {
      cardNumber: cardNumber.value,
      date: date.value,
      cvvNumber: cvvNumber.value,
      email: email.value
    },
    parseInt(validationLength.value)
  )

  return (
    !errors.value.cardNumber && !errors.value.cvvNumber && !errors.value.date && !errors.value.email
  )
}

const handleSubmit = async () => {
  firstValidation = true
  if (!validateForm()) return
  isLoading.value = true
  try {
    const [month, year] = date.value.split('/')
    const { data } = await createToken({
      card_number: Number(cardNumber.value.replace(/ /g, '')),
      cvv: Number(cvvNumber.value),
      expiration_month: month,
      expiration_year: '20' + year,
      email: email.value
    })

    if (data?.token) {
      createdToken.value = data.token
      cardNumber.value = ''
      cvvNumber.value = ''
      date.value = ''
      email.value = ''
    }
  } catch (error: any) {
    errorMessage.value = error.response.data.message
  } finally {
    isLoading.value = false
  }
}

const copyTextToClipboard = async () => {
  navigator.clipboard.writeText(createdToken.value)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 1000)
}
</script>

<template>
  <MainLayout>
    <div class="text-primary-300 px-4 sm:px-10">
      <RouterLink to="/cardInfo">Obtener información de la tarjeta</RouterLink>
    </div>
    <div class="flex h-screen w-screen flex-col p-4 sm:h-auto sm:w-[28rem] sm:bg-light-100 sm:p-10">
      <form @submit.prevent="handleSubmit">
        <div class="pb-6">
          <TextInput
            @input="handleCardChange"
            v-model="cardNumber"
            label="Número de tarjeta"
            type="text"
            :maxlength="validationLength"
            inputmode="numeric"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <span class="mt-2 text-xs font-light text-danger-300">
            {{ errors.cardNumber }}
          </span>
        </div>
        <div class="flex flex-row gap-4 pb-6">
          <div class="flex flex-col flex-1">
            <TextInput
              @input="handleExpirationDateChange"
              v-model="date"
              label="Fecha de expiración"
              type="text"
              maxlength="5"
              inputmode="numeric"
              placeholder="MM/YY"
              pattern="^[0-9]{1,2}\/[0-9]{2}$"
            />
            <span class="mt-2 text-xs font-light text-danger-300">
              {{ errors.date }}
            </span>
          </div>
          <div class="flex flex-col flex-1">
            <TextInput
              @input="handleCVVChange"
              v-model="cvvNumber"
              label="CVV"
              type="text"
              maxlength="4"
              inputmode="numeric"
              placeholder="XXX"
              pattern="[0-9]*"
            />
            <span class="mt-2 text-xs font-light text-danger-300">
              {{ errors.cvvNumber }}
            </span>
          </div>
        </div>
        <div class="pb-6">
          <TextInput
            @input="handleEmailChange"
            v-model="email"
            label="Correo electrónico"
            type="email"
            inputmode="email"
            placeholder="ejemplo@mail.com"
          />
          <span class="mt-2 text-xs font-light text-danger-300">
            {{ errors.email }}
          </span>
        </div>
        <span class="mb-2 text-xs font-light text-danger-300">
          {{ errorMessage }}
        </span>
        <PrimaryButton :loading="isLoading" :disabled="isLoading" type="submit">
          CREAR TOKEN
        </PrimaryButton>
      </form>
    </div>
    <div v-if="createdToken" class="px-4 sm:px-10">
      <span class="block font-bold">Token generado</span>
      <div class="flex flex-row items-center gap-4">
        <span class="flex flex-1 bg-light-300 p-2 rounded-xl">{{ createdToken }}</span>
        <IconButton @click="copyTextToClipboard" :color="isCopied ? 'ACCENT' : 'PRIMARY'">
          <img v-if="!isCopied" alt="copy image" src="@/assets/copy.svg" width="20" height="20" />
          <img v-if="isCopied" alt="copy image" src="@/assets/check.svg" width="20" height="20" />
        </IconButton>
      </div>
      <div class="text-primary-300">
        <RouterLink to="/cardInfo">Obtener información de la tarjeta</RouterLink>
      </div>
    </div>
  </MainLayout>
</template>
