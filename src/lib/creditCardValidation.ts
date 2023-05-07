import type { ICardForm } from '@/interfaces/card.types'

export enum CC {
  VISA = 'VISA',
  AMEX = 'AMEX',
  MASTERCARD = 'MASTERCARD',
  DISCOVER = 'DISCOVER',
  DINERS = 'DINERS'
}

export const CARD_MASK = {
  VISA: 'XXXX XXXX XXXX XXXX',
  AMEX: 'XXXX XXXXXX XXXXX',
  MASTERCARD: 'XXXX XXXX XXXX XXXX',
  DISCOVER: 'XXXX XXXX XXXX XXXX',
  DINERS: 'XXXX XXXXXX XXXX'
}

export const getCreditCardType = (creditCard: string) => {
  const visa = new RegExp('^4\\d{0,15}$')
  const amex = new RegExp('^3[47]\\d{0,13}$')
  const diners = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}$')
  const mastercard = new RegExp('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}$')
  const discovery = new RegExp('^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}$')

  if (visa.test(creditCard)) {
    return CC.VISA
  }
  if (amex.test(creditCard)) {
    return CC.AMEX
  }
  if (diners.test(creditCard)) {
    return CC.DINERS
  }
  if (mastercard.test(creditCard)) {
    return CC.MASTERCARD
  }
  if (discovery.test(creditCard)) {
    return CC.DISCOVER
  }

  return undefined
}

export const checkLUHN = (card: number) => {
  const cardNumber = card.toString()
  const numberDigits = cardNumber.length
  let sum = 0
  let isSecond = false
  for (let i = numberDigits - 1; i >= 0; i--) {
    let double = cardNumber[i].charCodeAt(0) - '0'.charCodeAt(0)
    if (isSecond == true) {
      double = double * 2
    }
    sum += Math.trunc(double / 10)
    sum += double % 10

    isSecond = !isSecond
  }
  return sum % 10 == 0
}

export const validateCard = (form: ICardForm, validationLength: number) => {
  const { cardNumber, cvvNumber, email, date } = form
  let errors = {
    cardNumber: '',
    date: '',
    cvvNumber: '',
    email: ''
  }

  if (cardNumber.length !== validationLength) {
    errors = {
      ...errors,
      cardNumber: 'Número de tarjeta inválida'
    }
  }
  const [month, year] = date.split('/')
  if (
    !month ||
    !year ||
    month.length !== 2 ||
    year.length !== 2 ||
    parseInt('20' + year) > new Date().getFullYear() + 5 ||
    parseInt(month) < 0 ||
    parseInt(month) > 12
  ) {
    errors = {
      ...errors,
      date: 'Fecha inválida'
    }
  } else if (parseInt('20' + year) < new Date().getFullYear()) {
    errors = {
      ...errors,
      date: 'La tarjeta ya expiró'
    }
  } else if (
    parseInt('20' + year) < new Date().getFullYear() ||
    (parseInt('20' + year) === new Date().getFullYear() &&
      parseInt(month) < new Date().getMonth() + 1)
  ) {
    errors = {
      ...errors,
      date: 'La tarjeta ya expiró'
    }
  }

  if (cvvNumber.length < 3 || cvvNumber.length > 4) {
    errors = {
      ...errors,
      cvvNumber: 'Código de validación invalido'
    }
  }
  if (!RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
    errors = {
      ...errors,
      email: 'Correo inválido'
    }
  }

  return errors
}
