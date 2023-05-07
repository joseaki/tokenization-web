import axiosClient from '@/config/axios.config'
import type { ILoginResponse } from '@/interfaces/commerce.types'
import type { IResponse } from '@/interfaces/common.types'

export const login = async (
  username: string,
  password: string
): Promise<IResponse<ILoginResponse>> => {
  const response = await axiosClient.post<IResponse<ILoginResponse>>('login', {
    username,
    password
  })

  return response.data
}
