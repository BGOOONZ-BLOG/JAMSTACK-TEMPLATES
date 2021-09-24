import { useState, useEffect, useCallback } from 'react'
import { verifyToken } from 'src/modules/auth/actions'

export default (user, dispatch) => {
  const [loading, setLoading] = useState(true)
  const [error, _setError] = useState(null)

  const fetchUser = useCallback(() => verifyToken(dispatch, setLoading), [
    dispatch,
  ])

  useEffect(() => {
    if (!user.isLoggedIn) {
      fetchUser()
    }
  }, [user.isLoggedIn, fetchUser])

  return {
    error,
    loading,
    isLoggedIn: user.isLoggedIn,
  }
}
