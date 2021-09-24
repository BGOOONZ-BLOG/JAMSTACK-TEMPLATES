export default (state = { loading: false }, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false,
      }
    case 'FOLLOW_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: state.profile.followers.find(
            user => user._id === action.payload.myId
          )
            ? state.profile.followers.filter(
                user => user._id !== action.payload.myId
              )
            : [
                ...state.profile.followers,
                {
                  _id: action.payload.myId,
                  avatar: action.payload.avatar,
                  firstName: action.payload.firstName,
                  lastName: action.payload.lastName,
                  username: action.payload.username,
                },
              ],
        },
      }
    case 'FAILED_TO_GET_PROFILE':
      return {
        errors: action.payload,
        loading: false,
      }
    case 'LOADING_PROFILE':
      return {
        loading: true,
      }
    default:
      return state
  }
}
