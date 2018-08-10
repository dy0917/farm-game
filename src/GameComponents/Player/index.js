import playerImgPath from './player.png'
export default class Player {
	constructor(args){
		this.position = args.position;      
		this.speed = args.speed;
		this.radius = args.radius; 
		this.delete = false;
		this.onDie = args.onDie;
		this.direction=0;
		this.actionIndex=0;
		this.actionCounter=0;
	}

	update(keys) {
		if (keys.up && keys.left) {
			this.position.y -= this.speed;
			this.position.x -= this.speed;
		} else if (keys.up && keys.right) {
			this.position.y -= this.speed;
			this.position.x += this.speed;
		} 
		else if (keys.down && keys.left) {
			this.position.y += this.speed;
			this.position.x -= this.speed;
		} 
		else if (keys.down && keys.right) {
			this.position.y += this.speed;
			this.position.x += this.speed;

		} else if (keys.right) {
			this.position.x += this.speed;
			this.direction=2;
		} else if (keys.left) {
			this.position.x -= this.speed;
			this.direction=1;
		} 
		else if (keys.up) {
			this.position.y -= this.speed;
			this.direction=3;
		} else if (keys.down) {
			this.position.y += this.speed;
			this.direction=0;
		}

		if(keys.left||keys.right||keys.up||keys.down){
			this.actionCounter++;
			var count= this.actionCounter%16;
			var step= Math.floor(count/4);
			this.actionIndex=step;
		}
	}

	render(state, player) {
		const context = state.context;
		if(player.position.x > state.screen.width) {
			player.position.x = 0;
		} else if(player.position.x < 0) {
			player.position.x = state.screen.width;
		}
		console.log('player', player);
		context.save();
		context.translate(player.position.x, player.position.y);
		context.strokeStyle = '#ffffff';
		context.fillStyle = '#ffffff';
		context.lineWidth = 2;
		const playerImg = new Image();
		playerImg.src=player;
		context.drawImage(
			playerImg,
			player.actionIndex*32,
			player.direction*48,
			32,
			48,
			0,
			0,
			32,
			48);
		context.restore();

	}
}



export function playerRender(screen, player) {
	const context = screen.context;
	if(player.position.x > screen.width) {
		player.position.x = 0;
	} else if(player.position.x < 0) {
		player.position.x = screen.width;
	}
	context.save();
	context.translate(player.position.x, player.position.y);
	context.strokeStyle = '#ffffff';
	context.fillStyle = '#ffffff';
	context.lineWidth = 2;
	const playerImg = new Image();
	playerImg.src=playerImgPath;
	context.drawImage(
		playerImg,
		player.actionIndex*32,
		player.direction*48,
		32,
		48,
		0,
		0,
		32,
		48);
	context.restore();

}