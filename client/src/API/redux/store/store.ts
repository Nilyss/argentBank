import { configureStore, Middleware } from '@reduxjs/toolkit'

// middlewares
import { logger } from '../middlewares/logger'

// reducers
import rootReducer from '../reducers/rootReducer'

// slices


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger as Middleware),
})

export default store
