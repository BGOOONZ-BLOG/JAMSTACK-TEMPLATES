import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import setAuthToken from 'src/helpers/setAuthToken'
import { BASE_URL } from 'src/config'
import { goHome } from 'src/config/navigation'

export const login = async ({ dispatch, setErrors, setSubmitting, values }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, values)
    setAuthToken(data.token)
    await dispatch({ type: 'SAVE_USER', payload: data })
    await AsyncStorage.setItem('token', data.token)
    setSubmitting(false)
    goHome(data.token)
  } catch (err) {
    setSubmitting(false)
    setErrors({ email: err.response.data.error })
  }
}

export const register = async ({ dispatch, setSubmitting, values }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/register`, values)
    setAuthToken(data.token)
    await dispatch({ type: 'SAVE_USER', payload: data })
    await AsyncStorage.setItem('token', data.token)
    setSubmitting(false)
    goHome(data.token)
  } catch (err) {
    setSubmitting(false)
    console.log(err)
  }
}

export const logout = async dispatch => {
  try {
    await axios.delete(`${BASE_URL}/user/logout`)
    await dispatch({ type: 'LOGOUT' })
    await AsyncStorage.removeItem('token')
    setAuthToken(false)
    goHome(data.token)
  } catch (err) {
    console.log(err)
  }
}

export const verifyToken = async (dispatch, setLoading) => {
  try {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      const { data } = await axios({
        method: 'GET',
        url: `${BASE_URL}/user/verify`,
        headers: {
          'Content-Type': 'application/json',
          'x-auth': token,
        },
      })

      setAuthToken(data.token)
      await dispatch({ type: 'SAVE_USER', payload: data })
      AsyncStorage.setItem('token', data.token)
    }
  } catch (err) {
    setError(err)
  } finally {
    setLoading(false)
  }
}
