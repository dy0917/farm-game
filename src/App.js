import React, { Component } from 'react';
import TitleScreen from './ReactComponents/TitleScreen';
import {Player, playerRender} from './GameComponents/Player';
import Invader from './GameComponents/Enemy';
import InputManager from './InputManager';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { GameState, updateWorld, updateWorldState, startGame } from './GameComponents/World/worldAction'
import { updatePlayer } from './GameComponents/Player/playerAction'

import './App.css';

const KEY = {
	  LEFT:  37,
	  RIGHT: 39,
	  UP: 38,
	  DOWN: 40,
	  A: 65,
	  D: 68,
	  W: 87,
	  S: 83,
	  SPACE: 32,
	  ENTER: 13
   };


class App extends Component {

	constructor(props) {
		super(props);
		this.inputManager =new InputManager();
		this.screen = {
			context: null,
			width : 800,
			height: window.innerHeight,
			ratio : window.devicePixelRatio || 1,
		}
		this.bindKeys();
		this.invaders = [];
	}


	componentDidMount() {
		// this.state.input.bindKeys();
		const context = this.refs.canvas.getContext('2d');
		this.screen.context= context;
		requestAnimationFrame(() => {this.update()}); 

	}

	update() {
		// const keys = this.state.input.pressedKeys;
		const keys = {}
		// if (this.props.world.gameState === GameState.StartScreen && keys.enter) {
		// 	this.startGame();
		// }

		if (this.props.world.gameState === GameState.Playing) {
			this.clearBackground();
		    // this.renderInvaders(this.state);
			// if (this.player !== undefined && this.player !== null) {
	
				playerRender(this.screen, this.props.player);
			// }
		}
		requestAnimationFrame(() => {this.update()});
	}

	clearBackground() {
		const context = this.screen.context;
		context.save();
		context.scale(this.props.world.ratio, this.props.world.ratio);
		context.fillRect(0, 0, this.props.world.width, this.props.world.height);
		context.globalAlpha = 1;
	}

	startGame() {
		let player = {
			radius: 15,
			speed: 2.5,
			position: {
				x: this.props.world.width/2,
				y: this.props.world.height - 48
			},
			direction: 0,
			actionIndex: 0,
			actionCounter: 0
		};

		// this.props.onUpdatePlayer(player)
		this.props.onupdateWorldState(GameState.Playing);
 	// 	this.createInvaders(27);	
		// this.setState({
		// 	gameState: GameState.Playing
		// });
	}

	createInvaders(count) {
		const newPosition = { x: 100, y: 20 };
		let swapStartX = true;

		for (var i = 0; i < count; i++) {
			const invader = new Invader({
				position: { x: newPosition.x, y: newPosition.y },
				speed: 1,
				radius: 50
			});

			newPosition.x += invader.radius + 20;

			if (newPosition.x + invader.radius + 50 >= this.screen.width) {
				newPosition.x = swapStartX ? 110 : 100;
				swapStartX = !swapStartX;
				newPosition.y += invader.radius + 20;
			}

			this.invaders.push(invader);
		}
	}

	handleKeys(value, e){
		var inputs = this.inputManager.handleKeys(value, e);
		if(this.props.world.gameState===GameState.StartScreen){
			this.startGame()
		}else{
			this.props.onUpdatePlayer(inputs);
		}
	}
	

	bindKeys() {
		window.addEventListener('keyup',   this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
	}

	renderInvaders(state) {
		let index = 0;
		let reverse = false;

		for (let invader of this.invaders) {
			if (invader.delete) {
				this.invaders.splice(index, 1);
			}
			else if (invader.position.x + invader.radius >= this.state.screen.width ||
				invader.position.x - invader.radius <= 0) {
				reverse = true;
		}
		else {       
			this.invaders[index].update();
			this.invaders[index].render(state);
		}
		index++;
	}

	// if (reverse) {
	// 	this.reverseInvaders();
	// }

}

// reverseInvaders() {
// 	let index = 0;
// 	for (let invader of this.invaders) {
// 		this.invaders[index].reverse();
// 		this.invaders[index].position.y += 50;
// 		index++;
// 	}
// }


render() {
	return (
		<div>   
		{ this.props.world.gameState === GameState.StartScreen && <TitleScreen /> }  
		<canvas ref="canvas"
		width={ parseInt(this.screen.width) * parseInt(this.screen.ratio) }
		height={ this.screen.height * this.screen.ratio } />
		</div>
		)
	}
}

 const mapStateToProps = state=>{
	return {
		world: state.world,
		player: state.player
	}
}

const mapActionToProps=(dispatch, props) => {
	return bindActionCreators({
		onUpdateWorld: updateWorld,
		onupdateWorldState: updateWorldState,
		onUpdatePlayer: updatePlayer
	}, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(App)
