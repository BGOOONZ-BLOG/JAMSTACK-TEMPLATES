import React, { Suspense, useContext, lazy } from 'react'
import UserProvider, { Context } from 'providers/UserProvider'
import Theme from './global-style'
import useFetchUser from 'hooks/useFetchUser'

const Authenticated = lazy(() => import('./Authenticated'))
const Unauthenticated = lazy(() => import('./Unauthenticated'))

const App = () => {
  const { user, dispatch } = useContext(Context)
  const { loading, isLoggedIn } = useFetchUser(user, dispatch)

  return (
    <>
      {loading ? (
        <h4>loading...</h4>
      ) : isLoggedIn ? (
        <Suspense fallback={<h4>loading...</h4>}>
          <Authenticated isLoggedIn={isLoggedIn} dispatch={dispatch} />
        </Suspense>
      ) : (
        <Suspense fallback={<h4>loading...</h4>}>
          <Unauthenticated />
        </Suspense>
      )}
    </>
  )
}

export default () => (
  <UserProvider>
    <Theme />
    <App />
  </UserProvider>
)
