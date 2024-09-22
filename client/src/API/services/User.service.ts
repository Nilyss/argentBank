// API
import { APICalls } from '../APICalls'

// types
import {
  ICreateUserResponse,
  ILoginResponse,
  IProfile,
  IProfileResponse,
  IProfileUpdateResponse,
} from '../types/userTypes'

export class UserService extends APICalls {
  constructor() {
    super()
  }

  async signUp(newUser: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) {
    const res = await this.postRequest<ICreateUserResponse>(
      'user/signup',
      newUser,
    )
    return res.data
  }

  async login(userCredentials: { email: string; password: string }) {
    const res = await this.postRequest<ILoginResponse>(
      'user/login',
      userCredentials,
    )
    return res.data
  }

  async getProfile(userToken: string): Promise<IProfile> {
    const res = await this.postRequest<IProfileResponse>(
      'user/profile',
      {},
      { Authorization: `Bearer ${userToken}` },
    )
    return res.data.body
  }

  async updateProfile(
    userToken: string,
    firstName: string,
    lastName: string,
  ): Promise<IProfileUpdateResponse> {
    const res = await this.putRequest<IProfileUpdateResponse>(
      'user/profile',
      {
        firstName: firstName,
        lastName: lastName,
      },
      { Authorization: `Bearer ${userToken}` },
    )
    return res.data
  }
}
