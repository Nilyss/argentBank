// API
import { APICalls } from '../APICalls'

// types
import { ILoginResponse } from '../types/userTypes'

export class UserService extends APICalls {
  constructor() {
    super()
  }

  async login(userCredentials: { email: string; password: string }) {
    const res = await this.postRequest<ILoginResponse>(
      'user/login',
      userCredentials,
    )
    return res.data
  }

  // async signUp

  // async createProfile

  // async updateProfile
}
