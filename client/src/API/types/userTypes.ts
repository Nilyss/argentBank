export interface ICreateUserResponse {
  body: {
    id: string
    email: string
  }
}

export interface ILoginResponse {
  body: {
    token: string
    profile: IProfile
  }
}

export interface IProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export interface IProfileResponse {
  body: IProfile
}
