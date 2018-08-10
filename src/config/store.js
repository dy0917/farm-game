import {createStore, combineReducers } from 'redux'
import worldReducer from '../GameComponents/World/worldReducer'
import playerReducer from '../GameComponents/Player/playerReducer'

const rootReducer= combineReducers({
	world: worldReducer,
	player: playerReducer
})

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store