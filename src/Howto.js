Ball.Howto = function(game) {
};
Ball.Howto.prototype = {
	create: function() {
		this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this); //Birtir how to play myndina
	},
	startGame: function() {
		this.game.state.start('Game'); //Keyrir game javascript file-ið
	}
};