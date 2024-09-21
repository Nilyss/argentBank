// API
import { APICalls } from '../APICalls'

// types
import {
  ICreateUserResponse,
  ILoginResponse,
  IProfile,
  IProfileResponse,
} from '../types/userTypes'

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

  // TODO: CREATE A NEW USER
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
