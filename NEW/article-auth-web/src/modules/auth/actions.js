import history from 'helpers/history'
import axios from 'axios'
import invoke from 'react-native-webview-invoke/browser'
import setAuthToken from 'helpers/setAuthToken'
import { BASE_URL } from 'config'

export const login = async ({ dispatch, setErrors, setSubmitting, values }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, values)
    setAuthToken(data.token)
    await dispatch({ type: 'SAVE_USER', payload: data })
    window.localStorage.setItem('token', data.token)
    setSubmitting(false)
    history.push('/')
  } catch (err) {
    setErrors({ email: err.response.data.error })
    setSubmitting(false)
  }
}

export const register = async ({ dispatch, setSubmitting, values }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/register`, values)
    setAuthToken(data.token)
    await dispatch({ type: 'SAVE_USER', payload: data })
    window.localStorage.setItem('token', data.token)
    setSubmitting(false)
    history.push('/')
  } catch (err) {
    setSubmitting(false)
    console.log(err)
  }
}

export const logout = async dispatch => {
  try {
    const onLogout = invoke.bind('onLogout')
    if (onLogout) {
      onLogout().then(() => {})
    }
    await axios.delete(`${BASE_URL}/user/logout`)
    await dispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('token')
    setAuthToken(false)
    history.push('/')
  } catch (err) {
    console.log(err)
  }
}
