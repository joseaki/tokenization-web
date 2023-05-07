export interface IResponse<T = any> {
  data?: T
  message?: string
}

export interface TextInputEvent extends Event {
  target: HTMLInputElement
}
