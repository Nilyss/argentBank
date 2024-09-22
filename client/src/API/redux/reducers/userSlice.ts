import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserService } from '../../services/User.service.ts'
const userService = new UserService()

// types
import {
  ICreateUserResponse,
  ILoginResponse,
  IProfile,
  IProfileResponse,
  IProfileUpdateResponse,
} from '../../types/userTypes'

// initial State type
export interface IUserState {
  profile: IProfile | null
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  error: string | null
  id?: string | null
  email?: string | null
}

export const createUser = createAsyncThunk<
  ICreateUserResponse,
  { email: string; password: string; firstName: string; lastName: string },
  { rejectValue: string }
>('user/signup', async ({ email, password, firstName, lastName }, thunkAPI) => {
  try {
    const res = await userService.signUp({
      email,
      password,
      firstName,
      lastName,
    })

    return { body: { _id: res.body._id, email: res.body.email } }
  } catch (err) {
    const error = err as { response?: { data?: string }; message?: string }
    const errorMessage =
      error.response?.data ||
      error.message ||
      `Erreur lors de la creation d'utilisateur`

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const loginUser = createAsyncThunk<
  ILoginResponse,
  { email: string; password: string; remember: boolean },
  { rejectValue: string }
>('user/login', async ({ email, password, remember }, thunkAPI) => {
  try {
    const res = await userService.login({ email, password })

    if (remember) {
      localStorage.setItem('authToken', res.body.token)
    }

    return { body: { token: res.body.token } }

  } catch (err) {
    const error = err as { response?: { data?: string }; message?: string }

    const errorMessage =
      error.response?.data || error.message || 'Erreur lors de la connexion'

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const getProfile = createAsyncThunk<
  IProfileResponse,
  { token: string },
  { rejectValue: string }
>('user/profile', async ({ token }, thunkAPI) => {
  try {
    const profile = await userService.getProfile(token)

    return { body: profile }

  } catch (err) {
    const error = err as { response?: { data?: string }; message?: string }

    const errorMessage =
      error.response?.data || error.message || 'Erreur lors de la connexion'

    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const updateProfile = createAsyncThunk<
  IProfileUpdateResponse,
  { token: string; firstName: string; lastName: string },
  { rejectValue: string }
>('user/updateProfile', async ({ token, firstName, lastName }, thunkAPI) => {
  try {
    const res = await userService.updateProfile(token, firstName, lastName)

    return { body: { id: res.body.id, email: res.body.email } }

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

      // cases create new user
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<ICreateUserResponse>) => {
          state.loading = false
          state.id = action.payload.body._id
          state.email = action.payload.body.email
        },
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || `Erreur interne`
      })

      // case login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.loading = false
          state.isAuthenticated = false
          state.token = action.payload.body.token
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload || 'Erreur interne'
      })

      // case get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<IProfileResponse>) => {
          state.loading = false
          state.isAuthenticated = true
          state.profile = action.payload.body
        },
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload || 'Erreur interne'
      })

      // case update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<IProfileUpdateResponse>) => {
          state.loading = false
          state.isAuthenticated = true
          state.id = action.payload.body.id
          state.email = action.payload.body.email
        },
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload || 'Erreur interne'
      })
  },
})

export const { resetError, logout } = userSlice.actions
export default userSlice.reducer
