import { isOnProduction } from '../utils/scripts/Utils.ts'

interface IAPICalls {
  baseUrl: string
  getRequest<T>(endpoint: string): Promise<T>
  postRequest<T>(endpoint: string, body: object): Promise<APIResponse<T>>
}

export interface APIResponse<T> {
  data: T
  headers: Headers
}

export class APICalls implements IAPICalls {
  baseUrl: string
  constructor() {
    this.baseUrl = isOnProduction
      ? ''
      : 'http://localhost:3001/api/v1/'
  }

  async getRequest<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.baseUrl + endpoint)
    if (!response.ok) {
      const error: Error = new Error('Network response was not ok')
      console.error(error)
      throw error
    }
    return (await response.json()) as Promise<T>
  }

  async postRequest<T>(
    endpoint: string,
    body: object,
  ): Promise<APIResponse<T>> {
    const response: Response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // credentials: 'include',
    })
    if (!response.ok) {
      const error: Error = new Error('Network response was not ok')
      console.error(error)
      throw error
    }
    const data: T = await response.json()
    return { data, headers: response.headers } as APIResponse<T>
  }
}