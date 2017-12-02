//Búið til boltan
var Ball = {
	_WIDTH: 320,
	_HEIGHT: 480
};

Ball.Boot = function(game) {};
Ball.Boot.prototype = {
	preload: function() { //Loadar inn loading barinn
		this.load.image('preloaderBg', 'img/loading-bg.png');
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() { //Create function
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preloader'); //Keyrir preloader javascript file-ið
	}
};