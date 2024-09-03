import { combineReducers } from '@reduxjs/toolkit'

import { IUserState } from './userSlice'
import userReducer from './userSlice'

export interface IRootState {
  user: IUserState
}

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
