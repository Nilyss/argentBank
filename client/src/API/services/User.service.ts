// API
import { APICalls } from '../APICalls'

// types
import { IUserCredentials } from '../types/userTypes'
import { IUser } from '../types/userTypes'

export class UserService extends APICalls {
  constructor() {
    super()
  }

  async login(userCredentials: IUserCredentials) {
    const res = await this.postRequest<IUser>('/user/login', userCredentials)
    return res.data
  }

  // async signUp

  // async createProfile

  // async updateProfile
}
