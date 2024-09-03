import { createSlice } from '@reduxjs/toolkit'

export interface IUserState {
  user: {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
  }
}

const initialState: IUserState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
