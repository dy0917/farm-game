import React, { Component } from 'react';
import TitleScreen from './ReactComponents/TitleScreen';
import Ship from './GameComponents/Ship';
import InputManager from './InputManager';
import './App.css';

const width = 800;
const height = window.innerHeight;
const ratio = window.devicePixelRatio || 1;
const GameState = {
	StartScreen : 0,
	Playing : 1,
	GameOver : 2
};


class App extends Component {

	constructor() {
		super();
		this.state = {
			input: new InputManager(), 
			screen: {
				width: width,
				height: height,
				ratio: window.devicePixelRatio || 1        
			},
			gameState: GameState.StartScreen,
			context: null
		}
		this.ship = null

	}

	componentDidMount() {
		this.state.input.bindKeys();
		const context = this.refs.canvas.getContext('2d');
		this.setState({ context: context });

		requestAnimationFrame(() => {this.update()});  
	}

	update() {
		const keys = this.state.input.pressedKeys;
		if (this.state.gameState === GameState.StartScreen && keys.enter) {
			this.startGame();
		}

		if (this.state.gameState === GameState.Playing) {
			this.clearBackground();
			if (this.ship !== undefined && this.ship !== null) {
				this.ship.update(keys);
				this.ship.render(this.state);       
			}
		}
		requestAnimationFrame(() => {this.update()});
	}

	clearBackground() {
		const context = this.state.context;
		context.save();
		context.scale(this.state.screen.ratio, this.state.screen.ratio);
		context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
		context.globalAlpha = 1;
	}

	startGame() {
		let ship = new Ship({
			radius: 15,
			speed: 2.5,
			position: {
				x: this.state.screen.width/2,
				y: this.state.screen.height - 50
			}});
		this.ship = ship;

		this.setState({
			gameState: GameState.Playing
		});
	}

	render() {
		return (
			<div>   
			{ this.state.gameState === GameState.StartScreen && <TitleScreen /> }  
			<canvas ref="canvas"
			width={ this.state.screen.width * this.state.screen.ratio }
			height={ this.state.screen.height * this.state.screen.ratio } />
			</div>
			)
		}
	}

	export default App;
