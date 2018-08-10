export const UPDATEPLAYER= 'PLAYER:update'

export function updatePlayer(keys) {
	return {
		type: UPDATEPLAYER,
		payload: keys
	}
}





// export function updateWorldState(args) {
// 	return {
// 		type: UPDATEWORLDSTATE,
// 		payload:{
// 			world: "asadfasdfdasdfasdf"
// 		}
// 	}
// }