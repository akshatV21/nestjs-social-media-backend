export type HttpResponse = {
  success: boolean
  message: string
  data?: any
}

export type HttpSuccessResponse = Promise<HttpResponse>
