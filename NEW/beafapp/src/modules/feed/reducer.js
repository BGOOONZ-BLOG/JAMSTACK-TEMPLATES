export default (state = { loading: false, data: [] }, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        data:
          action.page === 1
            ? action.payload
            : state.data.concat(action.payload),
        page: action.page,
        pages: action.pages,
        loading: false,
      }
    case 'FAILED_TO_GET_POSTS':
      return {
        ...state,
        errors: action.payload,
        loading: false,
      }
    case 'BEFORE_VOTE':
      return {
        ...state,
        data: state.data.map(item =>
          item._id === action.payload.post_id
            ? {
                ...item,
                before_votes:
                  item.before_votes.includes(action.payload.user_id) ||
                  item.after_votes.includes(action.payload.user_id)
                    ? item.before_votes
                    : [...item.before_votes, action.payload.user_id],
              }
            : item
        ),
      }
    case 'AFTER_VOTE':
      return {
        ...state,
        data: state.data.map(item =>
          item._id === action.payload.post_id
            ? {
                ...item,
                after_votes:
                  item.after_votes.includes(action.payload.user_id) ||
                  item.before_votes.includes(action.payload.user_id)
                    ? item.after_votes
                    : [...item.after_votes, action.payload.user_id],
              }
            : item
        ),
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        data: state.data.map(item =>
          item._id === action.payload.post_id
            ? {
                ...item,
                comments: [action.payload.newComment, ...item.comments],
              }
            : item
        ),
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        data: state.data.map(item =>
          item._id === action.payload.post_id
            ? {
                ...item,
                comments: item.comments.filter(
                  comment => comment._id !== action.payload.comment_id
                ),
              }
            : item
        ),
      }
    case 'DELETE_POST':
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload.post_id),
      }
    case 'LOADING_POSTS':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
