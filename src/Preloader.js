Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((Ball._WIDTH-297)*0.5, (Ball._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((Ball._WIDTH-158)*0.5, (Ball._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		//Loadar inn öll sprite-in sem eru notuð í leiknum
		this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');

		//Búið til pause og mute takkann
		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);
		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);

		//Loadar inn öll hljóðin
		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
		this.load.audio('audio-goal', ['audio/clap.ogg', 'audio/clap.mp3', 'audio/clap.m4a']);
		this.load.audio('audio-theme', ['audio/theme.ogg', 'audio/theme.mp3', 'audio/theme.m4a']);
	},
	create: function() {
		this.game.state.start('MainMenu'); //Keyrir Main Menu script
	}
};