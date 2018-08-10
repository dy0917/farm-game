export const UPDATEWORLD= 'world:update'
export const UPDATEWORLDSTATE= 'world:updateState'
export const StartGame= 'world:startGame'


export const GameState = {
	StartScreen : 0,
	Playing : 1,
	GameOver : 2
};

export function updateWorld(args) {
	return {
		type: UPDATEWORLD,
		payload:{
			world: args
		}
	}
}
export function updateWorldState(state) {
	return {
		type: UPDATEWORLDSTATE,
		payload: state
	}
}