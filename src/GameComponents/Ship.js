export default class Ship {
	constructor(args){
		this.position = args.position;      
		this.speed = args.speed;
		this.radius = args.radius; 
		this.delete = false;
		this.onDie = args.onDie;
	}
	update(keys) {
		if (keys.right) {
			this.position.x += this.speed;
		} else if (keys.left) {
			this.position.x -= this.speed;
		} 
	}
	render(state) {
		if(this.position.x > state.screen.width) {
			this.position.x = 0;
		} else if(this.position.x < 0) {
			this.position.x = state.screen.width;
		}
		
		const context = state.context;
		context.save();
		context.translate(this.position.x, this.position.y);
		context.strokeStyle = '#ffffff';
		context.fillStyle = '#ffffff';
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(0, -25);
		context.lineTo(15, 15);
		context.lineTo(5, 7);
		context.lineTo(-5, 7);
		context.lineTo(-15, 15);
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}

}