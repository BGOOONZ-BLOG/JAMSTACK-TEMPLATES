import axios from 'axios'
import uuidv1 from 'uuid/v1'
import moment from 'moment'
import { history } from '../../App'
import setAuthToken from '../../utils/setAuthToken'

const { REACT_APP_PROD_API } = process.env

const failedToGetPosts = error => ({
  type: 'FAILED_TO_GET_POSTS',
  payload: error,
})

export const getPosts = (page = 1) => async dispatch => {
  try {
    dispatch({ type: 'LOADING_POSTS' })

    if (localStorage.jwtToken) {
      axios.defaults.headers.common['x-auth'] = localStorage.jwtToken
    }
    const res = await axios.post(`${REACT_APP_PROD_API}/api/post/all/${page}`)
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.posts,
      pages: res.data.pages,
      page: parseInt(res.data.page, 10),
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const getPostsByCategory = (category, page = 1) => async dispatch => {
  try {
    dispatch({ type: 'LOADING_POSTS' })

    if (localStorage.jwtToken) {
      axios.defaults.headers.common['x-auth'] = localStorage.jwtToken
    }
    const res = await axios.post(
      `${REACT_APP_PROD_API}/api/post/category/${category}/${page}`
    )
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.posts,
      pages: res.data.pages,
      page: parseInt(res.data.page, 10),
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const deletePost = (id, callback) => async dispatch => {
  try {
    await axios.delete(`${REACT_APP_PROD_API}/api/post/${id}`)
    callback()
    dispatch({ type: 'DELETE_POST', payload: { post_id: id } })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const getMyPosts = (page = 1) => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_POSTS' })

    const res = await axios.post(
      `${REACT_APP_PROD_API}/api/post/personal/${page}`
    )
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.posts,
      pages: res.data.pages,
      page: parseInt(res.data.page, 10),
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const getPostsByUserId = (id, page = 1) => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_POSTS' })

    if (localStorage.jwtToken) {
      axios.defaults.headers.common['x-auth'] = localStorage.jwtToken
    }

    const res = await axios.post(
      `${REACT_APP_PROD_API}/api/post/user/${id}/${page}`
    )
    dispatch({
      type: 'GET_POSTS',
      payload: res.data.posts,
      pages: res.data.pages,
      page: parseInt(res.data.page, 10),
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const addPost = (
  image,
  image_2,
  payload,
  setErrors,
  setSubmitting,
  resetForm,
  stopProgress
) => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_POSTS' })

    const categories = [
      'entertainment',
      'sports',
      'politics',
      'gaming',
      'movies',
      'memes',
      'automotive',
      'fashion',
      'food',
      'tech',
      'science',
      'animals',
      'photography',
      'travel',
    ]

    if (!categories.includes(payload.category)) {
      return setErrors({
        category: 'Invalid category',
      })
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    delete axios.defaults.headers.common['x-auth']
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dj8equdxc/image/upload',
      image,
      config
    )
    const before_img = res.data.secure_url
    const res_2 = await axios.post(
      'https://api.cloudinary.com/v1_1/dj8equdxc/image/upload',
      image_2,
      config
    )
    const after_img = res_2.data.secure_url

    await setAuthToken(localStorage.jwtToken)

    await axios.post(`${REACT_APP_PROD_API}/api/post`, {
      ...payload,
      before_img,
      after_img,
    })
    stopProgress()
    setTimeout(() => {
      resetForm()
      setSubmitting(false)
      history.push('/')
    }, 1000)
  } catch (err) {
    stopProgress()
    setSubmitting(false)
    if (err.response.data.error.message) {
      setErrors({
        title: err.response.data.error.message,
      })
    } else {
      setErrors({
        title: err.response.data.error,
      })
    }
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const voteBefore = (id, user_id) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/post/vote/before/${id}`)
    await dispatch({ type: 'BEFORE_VOTE', payload: { post_id: id, user_id } })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const voteAfter = (id, user_id) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/post/vote/after/${id}`)
    dispatch({ type: 'AFTER_VOTE', payload: { post_id: id, user_id } })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const postNewComment = (
  id,
  creator_id,
  creator_username,
  comment,
  resetForm,
  setSubmitting
) => async dispatch => {
  try {
    const today = moment().utc()
    const generatedID = uuidv1()

    await axios.post(`${REACT_APP_PROD_API}/api/post/comment/${id}`, {
      comment,
      generatedID,
    })
    await dispatch({
      type: 'ADD_COMMENT',
      payload: {
        post_id: id,
        newComment: {
          _id: generatedID,
          creator_id,
          creator_username,
          date: today.toISOString(),
          comment,
        },
      },
    })
    resetForm()
    setSubmitting(false)
  } catch (err) {
    setSubmitting(false)
    dispatch(failedToGetPosts(err.response.error))
  }
}

export const deleteComment = (post_id, comment_id) => async dispatch => {
  try {
    await axios.delete(
      `${REACT_APP_PROD_API}/api/post/comment/${post_id}/${comment_id}`
    )
    dispatch({
      type: 'DELETE_COMMENT',
      payload: {
        post_id,
        comment_id,
      },
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.error))
  }
}
