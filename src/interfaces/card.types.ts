export interface ICardForm {
  cardNumber: string
  cvvNumber: string
  email: string
  date: string
}

export interface ICreateTokenRequest {
  card_number: number
  cvv: number
  email: string
  expiration_month: string
  expiration_year: string
}

export interface ICreateTokenResponse {
  token: string
}

export type ICardInfoResponse = Pick<
  ICreateTokenRequest,
  'card_number' | 'expiration_month' | 'expiration_year'
>
