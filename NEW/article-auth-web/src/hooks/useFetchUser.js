import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import setAuthToken from 'helpers/setAuthToken'
import getValueFromQueryParam from 'helpers/getValueFromQueryParam'
import { BASE_URL } from 'config'

export default (user, dispatch) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const token = window.localStorage.getItem('token')
      const { token: tokenFromRN } = getValueFromQueryParam()

      if (token || tokenFromRN) {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/user/verify`,
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token || tokenFromRN,
          },
        })

        setAuthToken(token || tokenFromRN)
        await dispatch({ type: 'SAVE_USER', payload: data })

        window.localStorage.setItem('token', data.token)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [dispatch])

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
