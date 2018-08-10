import {UPDATEWORLD, UPDATEWORLDSTATE, GameState } from './worldAction'


const initialState = {
	width : 800,
	height: window.innerHeight,
	ratio : window.devicePixelRatio || 1,
	gameState : GameState.StartScreen,

}

const worldReducer = (state=initialState, {type, payload}) => {
  switch(type) {
    case UPDATEWORLD:
      return {
        ...payload
      }
	case UPDATEWORLDSTATE:
		return Object.assign({}, state, {
    		gameState: payload
		})
      
    default:
      return state
  }
}

export default worldReducer