function start() {
	var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'game');
    game.state.add('Boot', Ball.Boot);
    game.state.add('Preloader', Ball.Preloader);
    game.state.add('MainMenu', Ball.MainMenu);
    game.state.add('Howto', Ball.Howto);
    game.state.add('Game', Ball.Game);
    game.state.start('Boot');
}

start();