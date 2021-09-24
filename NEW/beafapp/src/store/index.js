import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../modules/auth/reducer'
import FeedReducer from '../modules/feed/reducer'
import ProfileReducer from '../modules/profile/reducer'
import singlePostReducer from '../modules/post/reducer'
import usersReducer from '../modules/discover/reducer'

const composeEnhancers = process.env.REACT_APP_DEV_ENV
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose // eslint-disable-line

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    posts: FeedReducer,
    profile: ProfileReducer,
    singlePost: singlePostReducer,
    users: usersReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
)

export default store
