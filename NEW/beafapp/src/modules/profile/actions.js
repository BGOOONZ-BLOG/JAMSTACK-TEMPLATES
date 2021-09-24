import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

const { REACT_APP_PROD_API } = process.env

const failedToGetProfile = error => ({
  type: 'FAILED_TO_GET_PROFILE',
  payload: error,
})

export const getUserById = id => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_PROFILE' })
    const res = await axios.post(`${REACT_APP_PROD_API}/api/user/${id}`)
    dispatch({ type: 'GET_PROFILE', payload: res.data })
  } catch (err) {
    dispatch(failedToGetProfile(err.response.data.error))
  }
}

export const editProfile = (
  data,
  avatarImage,
  avatarState,
  setErrors,
  resetForm,
  setSubmitting
) => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_PROFILE' })

    if (avatarImage !== avatarState) {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      delete axios.defaults.headers.common['x-auth']
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dj8equdxc/image/upload',
        avatarImage,
        config
      )
      const avatar = res.data.secure_url

      await setAuthToken(localStorage.jwtToken)
      await axios.patch(`${REACT_APP_PROD_API}/api/user/edit`, {
        ...data,
        avatar,
      })

      resetForm()
      setSubmitting(false)

      window.location.href = '/profile'
    } else {
      const avatar = avatarState
      await axios.patch(`${REACT_APP_PROD_API}/api/user/edit`, {
        ...data,
        avatar,
      })

      resetForm()
      setSubmitting(false)

      window.location.href = '/profile'
    }
  } catch (err) {
    setSubmitting(false)
    if (err.response.data.error.message) {
      setErrors({
        firstName: err.response.data.error.message,
      })
    } else {
      setErrors({
        firstName: err.response.data.error,
      })
    }
    dispatch(failedToGetProfile(err.response.data.error))
  }
}
