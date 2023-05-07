import axiosClient from '@/config/axios.config'
import type { ICardInfoResponse, ICreateTokenRequest } from '@/interfaces/card.types'
import type { ICreateTokenResponse } from '@/interfaces/card.types'
import type { IResponse } from '@/interfaces/common.types'

export const createToken = async (
  card: ICreateTokenRequest
): Promise<IResponse<ICreateTokenResponse>> => {
  const response = await axiosClient.post<IResponse<ICreateTokenResponse>>('create-token', card)
  return response.data
}

export const getCardInfo = async (token: string): Promise<IResponse<ICardInfoResponse>> => {
  const response = await axiosClient.get<IResponse<ICardInfoResponse>>(`/get-card-info/${token}`)
  return response.data
}
