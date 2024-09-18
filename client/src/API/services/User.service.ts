// API
import { APICalls } from '../APICalls'

// types
import { ILoginResponse, IProfile, IProfileResponse } from '../types/userTypes'

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

  async getProfile(userToken: string): Promise<IProfile> {
    const res = await this.postRequest<IProfileResponse>(
      'user/profile',
      {},
      { Authorization: `Bearer ${userToken}` },
    )
    return res.data.body
  }

  // async updateProfile
}
