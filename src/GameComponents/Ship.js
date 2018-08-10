import playerImgPath from './player.png'
import Bullet from './Bullet'
import GameObject from './GameObject';
export default class Ship extends GameObject {
	constructor(args) {
		super({ position: args.position, onDie: args.onDie, speed: 2.5, radius: 15 });
		this.direction=0;
		this.actionIndex=0;
		this.actionCounter=0;
		this.bullets = [];
		this.lastShot = 0;
	}

	die() {
		this.onDie();
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

		if (keys.space && Date.now() - this.lastShot > 250) {
			
			const bullet = new Bullet({
				position: { x: this.position.x, y : this.position.y - 5 },
				speed: 2.5,
				radius: 15,
				direction : "up"
			});


			this.bullets.push(bullet);
			this.lastShot = Date.now();
		}

	}

	renderBullets(state) {
		let index = 0;
		for (let bullet of this.bullets) {
			if (bullet.delete) {
				this.bullets.splice(index, 1);
			} else {
				this.bullets[index].update();
				this.bullets[index].render(state);
			}
			index++;
		}
	}

	render(state) {
		const context = state.context;
		if(this.position.x > state.screen.width) {
			this.position.x = 0;
		} else if(this.position.x < 0) {
			this.position.x = state.screen.width;
		}

		this.renderBullets(state);

		context.save();
		context.translate(this.position.x, this.position.y);
		context.strokeStyle = '#ffffff';
		context.fillStyle = '#ffffff';
		context.lineWidth = 2;
		const playerImg = new Image();
		playerImg.src=playerImgPath;
		context.drawImage(
			playerImg,
			this.actionIndex*32,
			this.direction*48,
			32,
			48,
			0,
			0,
			32,
			48);
		context.restore();

	}
}