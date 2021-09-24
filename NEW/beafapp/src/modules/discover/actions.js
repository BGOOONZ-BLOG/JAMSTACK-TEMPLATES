import axios from 'axios'

const { REACT_APP_PROD_API } = process.env

const failedToGetUsers = error => ({
  type: 'FAILED_TO_GET_USERS',
  payload: error,
})

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: 'LOADING_USERS' })

    if (localStorage.jwtToken) {
      axios.defaults.headers.common['x-auth'] = localStorage.jwtToken
    }

    const res = await axios.post(`${REACT_APP_PROD_API}/api/user/users/all`)
    dispatch({ type: 'GET_USERS', payload: res.data })
  } catch (err) {
    dispatch(failedToGetUsers(err.response.data.error))
  }
}

export const followUser = (
  id,
  avatar,
  firstName,
  lastName,
  username,
  myId,
  profile
) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/user/follow/${id}`)
    if (profile) {
      dispatch({
        type: 'FOLLOW_PROFILE',
        payload: { user_id: id, avatar, firstName, lastName, username, myId },
      })
    } else {
      dispatch({
        type: 'FOLLOW',
        payload: { user_id: id, avatar, firstName, lastName, username, myId },
      })
    }
  } catch (err) {
    console.log(err)
    dispatch(failedToGetUsers(err.response.data.error))
  }
}

export const unFollowUser = (id, myId, profile) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/user/unfollow/${id}`)
    if (profile) {
      dispatch({ type: 'FOLLOW_PROFILE', payload: { user_id: id, myId } })
    } else {
      dispatch({ type: 'FOLLOW', payload: { user_id: id, myId } })
    }
  } catch (err) {
    console.log(err)
    dispatch(failedToGetUsers(err.response.data.error))
  }
}
