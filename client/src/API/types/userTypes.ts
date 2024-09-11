export interface ILoginResponse {
  body: {
    user: IUser
    token: string
  }
}

export interface IUser {
  id: string
  name: string
  email: string
}
