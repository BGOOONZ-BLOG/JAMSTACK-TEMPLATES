export default (state = { loading: false }, action) => {
  switch (action.type) {
    case 'GET_POST_BY_ID':
      return {
        ...state,
        post: action.payload,
        loading: false,
      }
    case 'FAILED_TO_GET_POST':
      return {
        ...state,
        errors: action.payload,
        loading: false,
      }
    case 'BEFORE_VOTE_POST':
      return {
        ...state,
        post: {
          ...state.post,
          before_votes:
            state.post.before_votes.includes(action.payload.user_id) ||
            state.post.after_votes.includes(action.payload.user_id)
              ? state.post.before_votes
              : [...state.post.before_votes, action.payload.user_id],
        },
      }
    case 'AFTER_VOTE_POST':
      return {
        ...state,
        post: {
          ...state.post,
          after_votes:
            state.post.after_votes.includes(action.payload.user_id) ||
            state.post.before_votes.includes(action.payload.user_id)
              ? state.post.after_votes
              : [...state.post.after_votes, action.payload.user_id],
        },
      }
    case 'ADD_COMMENT_TO_POST':
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload.newComment, ...state.post.comments],
        },
      }
    case 'DELETE_COMMENT_FROM_POST':
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== action.payload.comment_id
          ),
        },
      }
    case 'LOADING_POST':
      return {
        loading: true,
      }
    default:
      return state
  }
}
