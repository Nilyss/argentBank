// redux
import { configureStore, Middleware } from '@reduxjs/toolkit'

// middlewares
import { logger } from '../middlewares/logger.ts'

// reducers
import rootReducer from '../reducers/rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger as Middleware),
})

// export the type of the RootState
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
