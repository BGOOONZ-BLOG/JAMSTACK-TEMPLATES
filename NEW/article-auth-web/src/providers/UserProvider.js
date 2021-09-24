import React, { useReducer, createContext } from 'react'
import UserReducer from 'reducers/UserReducer'

export const Context = createContext()

export default ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, [])

  return (
    <Context.Provider
      value={{
        user,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}
