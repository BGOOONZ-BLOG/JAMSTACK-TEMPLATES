import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import TrashCansReducer from '../modules/dashboard/reducer'
// import WorkersReducer from '../modules/workers/reducer'
import AuthReducer from '../modules/auth/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	combineReducers({
		trashcan: TrashCansReducer,
		// worker: WorkersReducer,
		auth: AuthReducer
	}),
	composeEnhancers(applyMiddleware(thunk))
)

export default store
