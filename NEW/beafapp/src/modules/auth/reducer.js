import isEmpty from '../../utils/isEmpty'

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        isLoggedIn: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      }
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.find(
            user => user._id === action.payload.user_id
          )
            ? state.user.following.filter(
                user => user._id !== action.payload.user_id
              )
            : [
                ...state.user.following,
                {
                  _id: action.payload.user_id,
                  avatar: action.payload.avatar,
                  firstName: action.payload.firstName,
                  lastName: action.payload.lastName,
                  username: action.payload.username,
                },
              ],
        },
      }
    case 'FOLLOW_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.find(
            user => user._id === action.payload.user_id
          )
            ? state.user.following.filter(
                user => user._id !== action.payload.user_id
              )
            : [
                ...state.user.following,
                {
                  _id: action.payload.user_id,
                  avatar: action.payload.avatar,
                  firstName: action.payload.firstName,
                  lastName: action.payload.lastName,
                  username: action.payload.username,
                },
              ],
        },
      }
    case 'AUTH_FAILED':
      return {
        errors: action.payload,
        loading: false,
      }
    case 'LOADING_USER':
      return {
        loading: true,
      }
    default:
      return state
  }
}
