import axios from 'axios'
import uuidv1 from 'uuid/v1'
import { history } from '../../App'

const { REACT_APP_PROD_API } = process.env

const failedToGetPosts = error => ({
  type: 'FAILED_TO_GET_POST',
  payload: error,
})

export const getPostById = id => async dispatch => {
  try {
    await dispatch({ type: 'LOADING_POST' })

    const res = await axios.post(`${REACT_APP_PROD_API}/api/post/${id}`)
    dispatch({ type: 'GET_POST_BY_ID', payload: res.data })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${REACT_APP_PROD_API}/api/post/${id}`)
    history.push('/')
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const voteBefore = (id, user_id) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/post/vote/before/${id}`, {
      user_id,
    })
    await dispatch({
      type: 'BEFORE_VOTE_POST',
      payload: { post_id: id, user_id },
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.data.error))
  }
}

export const voteAfter = (id, user_id) => async dispatch => {
  try {
    await axios.patch(`${REACT_APP_PROD_API}/api/post/vote/after/${id}`, {
      user_id,
    })
    dispatch({ type: 'AFTER_VOTE_POST', payload: { post_id: id, user_id } })
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
    const today = new Date()
    const generatedID = uuidv1()

    await axios.post(`${REACT_APP_PROD_API}/api/post/comment/${id}`, {
      comment,
      generatedID,
    })
    await dispatch({
      type: 'ADD_COMMENT_TO_POST',
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
      type: 'DELETE_COMMENT_FROM_POST',
      payload: {
        post_id,
        comment_id,
      },
    })
  } catch (err) {
    dispatch(failedToGetPosts(err.response.error))
  }
}
