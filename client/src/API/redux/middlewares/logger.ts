import { Middleware } from '@reduxjs/toolkit'

export const logger: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action)
  const state = storeAPI.getState()

  // @ts-ignore
  console.groupCollapsed(action.type)
  console.log('[Logger Middleware] Previous state : ', state)
  console.log('[Logger Middleware] Action : ', action)
  console.log('[Logger Middleware] Next state : ', storeAPI.getState())
  console.groupEnd()

  return result
}
