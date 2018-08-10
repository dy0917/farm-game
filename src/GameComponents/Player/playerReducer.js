import {UPDATEPLAYER} from './playerAction'


const initialState = {
	position: {
				x: 0,
				y: 0,
			},   
	radius: 15,
	speed: 2.5,
	delete: false,
	onDie:{},
	direction: 0,
	actionIndex: 0,
	previousKeys: null,
	actionCounter: 0
}

const playerReducer = (state=initialState, {type, payload}) => {
  switch(type) {
    case UPDATEPLAYER :
    var player= {
    	position:[0,0],
		direction: 0,
	actionIndex: 0,
	previousKeys: null,
	actionCounter: 0
    };
 //    console.log(player);
	if(payload){
		if (payload.up && payload.left) {
			state.position.y -= state.speed;
			state.position.x -= state.speed;
		} else if (payload.up && payload.right) {
			state.position.y -= state.speed;
			state.position.x += state.speed;
		} 
		else if (payload.down && payload.left) {
			state.position.y += state.speed;
			state.position.x -= state.speed;
		} 
		else if (payload.down && payload.right) {
			state.position.y += state.speed;
			state.position.x += state.speed;

		} else if (payload.right) {
			state.position.x += state.speed;
			state.direction=2;
		} else if (payload.left) {
			state.position.x -= state.speed;
			state.direction=1;
		} 
		else if (payload.up) {
			state.position.y -= state.speed;
			state.direction=3;
		} else if (payload.down) {
			state.position.y += state.speed;
			state.direction=0;
		}

		// if(payload.left||payload.right||payload.up||payload.down){
			state.actionCounter++;
			var count= state.actionCounter%16;
			var step= Math.floor(count/4);
			state.actionIndex=step;
		// }
	}
    console.log(state);
return state
	// return Object.assign({}, state, {
	// 	position: player.position
	// })
    default:
      return state
  }
}

export default playerReducer