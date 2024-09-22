export interface ICreateUserResponse {
  body: {
    _id: string
    email: string
  }
}

export interface ILoginResponse {
  body: {
    token: string
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

export interface IProfileUpdateResponse {
  body: {
    id: string
    email: string
  }
}
