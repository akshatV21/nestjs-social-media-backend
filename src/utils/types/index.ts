import { USER_TYPES } from '../constants'

export type HttpResponse = {
  success: boolean
  message: string
  data?: any
}

export type HttpSuccessResponse = Promise<HttpResponse>

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES]
