import { isOnProduction } from '../utils/scripts/Utils.ts'

interface IAPICalls {
  baseURL: string
  getRequest<T>(endpoint: string): Promise<T>
  postRequest<T>(endpoint: string, body: object): Promise<APIResponse<T>>
  putRequest<T>(endpoint: string, body: object): Promise<APIResponse<T>>
}

export interface APIResponse<T> {
  data: T
  headers: Headers
}

export class APICalls implements IAPICalls {
  baseURL: string
  constructor() {
    this.baseURL = isOnProduction ? '' : 'http://localhost:3001/api/v1/'
  }

  async getRequest<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.baseURL + endpoint)
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
    headers?: object,
  ): Promise<APIResponse<T>> {
    const response: Response = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      // credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json()
      const error: Error = new Error(
        (errorData.message && response.status.toString()) ||
          'Response was not OK',
      )
      console.error(error)
      throw error
    }
    const data: T = await response.json()
    return { data, headers: response.headers } as APIResponse<T>
  }

  async putRequest<T>(
    endpoint: string,
    body: { firstName: string; lastName: string },
    headers?: object,
  ): Promise<APIResponse<T>> {
    const response: Response = await fetch(this.baseURL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      // credentials: 'include',
    })
    if (!response.ok) {
      const errorData = await response.json()
      const error: Error = new Error(
        (errorData.message && response.status.toString()) ||
          ' Response was not OK',
      )
      console.error(error)
      throw error
    }
    const data: T = await response.json()
    return { data, headers: response.headers } as APIResponse<T>
  }
}
