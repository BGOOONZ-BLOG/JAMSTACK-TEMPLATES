import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../modules/auth/reducer'
import ThemeReducer from '../modules/theme/reducer'

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__())
    || compose

const store = createStore(
	combineReducers({
		auth: AuthReducer,
		theme: ThemeReducer
	}),
	composeEnhancers(applyMiddleware(thunk))
)

export default store
