import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserService } from '../../services/User.service.ts'
const userService = new UserService()

// types
import { ILoginResponse, IProfile } from '../../types/userTypes'

// initial State type
export interface IUserState {
  profile: IProfile | null
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  error: string | null
}

export const loginUser = createAsyncThunk<
  ILoginResponse,
  { email: string; password: string; remember: boolean },
  { rejectValue: string }
>('user/login', async ({ email, password, remember }, thunkAPI) => {
  try {
    // force loading to avoid flashing content if the fetch is too fast
    await new Promise((resolve) => setTimeout(resolve, 500))

    const res = await userService.login({ email, password })

    if (remember) {
      localStorage.setItem('authToken', res.body.token)
    }

    const profile = await userService.getProfile(res.body.token)

    return { body: { token: res.body.token, profile: profile } }
  } catch (err) {
    const error = err as { response?: { data?: string }; message?: string }

    const errorMessage =
      error.response?.data || error.message || 'Erreur lors de la connexion'

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

// Initial State
const initialState: IUserState = {
  profile: null,
  isAuthenticated: false,
  token: localStorage.getItem('authToken'),
  loading: false,
  error: null,
}

// User Slice creation with reducer and extra reducers (store)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('authToken')
    },
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.loading = false
          state.isAuthenticated = true
          state.token = action.payload.body.token
          state.profile = action.payload.body.profile
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload || 'Erreur interne'
      })
  },
})

export const { resetError, logout } = userSlice.actions
export default userSlice.reducer
