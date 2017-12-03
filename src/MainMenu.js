Ball.MainMenu = function(game) {};
Ball.MainMenu.prototype = {
	create: function() {
		//Búið til main menu skjáinn og button til að byrja leik
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.gameTitle = this.add.sprite(Ball._WIDTH*0.5, 40, 'title');
		this.gameTitle.anchor.set(0.5,0);
		this.startButton = this.add.button(Ball._WIDTH*0.5, 200, 'button-start', this.startGame, this, 2, 0, 1);
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;
	},
	startGame: function() {
		this.game.state.start('Game'); //Byrjar leikinn þegar ýtt er á takkann
	}
};