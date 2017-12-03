Ball.Game = function(game) {};
Ball.Game.prototype = {
	create: function() {
		//Loadar inn sprite-in og býr till öll value sem eru notuð
		this.add.sprite(0, 0, 'screen-bg');
		this.add.sprite(0, 0, 'panel');
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
		this.fontBig = { font: "24px Arial", fill: "#e4beef" };
		this.fontMessage = { font: "24px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.audioStatus = true;
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 8;
		this.movementForce = 10;
		this.ballStartPos = { x: Ball._WIDTH*0.5, y: 450 };
		this.themeSound = this.game.add.audio('audio-theme'); //Loadar inn theme songið
		this.themeSound.volume = 0.05; //Lækkar volume-ið
		this.themeSound.play(); //Spilar hann

		//Býr til UI-ið á toppinum
		this.pauseButton = this.add.button(Ball._WIDTH-8, 8, 'button-pause', this.managePause, this);
		this.pauseButton.anchor.set(1,0);
		this.pauseButton.input.useHandCursor = true;
		this.audioButton = this.add.button(Ball._WIDTH-this.pauseButton.width-8*2, 8, 'button-audio', this.manageAudio, this);
		this.audioButton.anchor.set(1,0);
		this.audioButton.input.useHandCursor = true;
		this.audioButton.animations.add('true', [0], 10, true);
		this.audioButton.animations.add('false', [1], 10, true);
		this.audioButton.animations.play(this.audioStatus);
		this.timerText = this.game.add.text(15, 15, "Tími: "+this.timer, this.fontBig);
		this.levelText = this.game.add.text(120, 10, "Borð: "+this.level+" / "+this.maxLevels, this.fontSmall);
		this.totalTimeText = this.game.add.text(120, 30, "Heildar tími: "+this.totalTimer, this.fontSmall);

		//Loadar inn holuna fyrir leikinn
		this.hole = this.add.sprite(Ball._WIDTH*0.5, 90, 'hole');
		this.physics.enable(this.hole, Phaser.Physics.ARCADE);
		this.hole.anchor.set(0.5);
		this.hole.body.setSize(2, 2);
		this.goalSound = this.game.add.audio('audio-goal');

		//Loadar inn boltan
		this.ball = this.add.sprite(this.ballStartPos.x, this.ballStartPos.y, 'ball');
		this.ball.anchor.set(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.setSize(18, 18);
		this.ball.body.bounce.set(0.3, 0.3);

		//Býr til öll levelin
		this.initLevels();
		this.showLevel(1);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		//Býr til borderinn
		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.borderGroup.create(0, 50, 'border-horizontal');
		this.borderGroup.create(0, Ball._HEIGHT-2, 'border-horizontal');
		this.borderGroup.create(0, 0, 'border-vertical');
		this.borderGroup.create(Ball._WIDTH-2, 0, 'border-vertical');
		this.borderGroup.setAll('body.immovable', true);
		this.bounceSound = this.game.add.audio('audio-bounce');
	},
	initLevels: function() {  //Býr til öll levelin
		this.levels = [];
		this.levelData = [
			[
				{ x: 96, y: 224, t: 'w' }
			],
			[
				{ x: 115, y:60 , t: 'h' },
				{ x: 115, y:190 , t: 'h' },
				{ x: 170, y:60 , t: 'h' },
				{ x: 170, y:190 , t: 'h' }
			],
			[
				{ x: 72, y: 320, t: 'w' },
				{ x: 200, y: 320, t: 'h' },
				{ x: 72, y: 150, t: 'w' }
			],
			[
				{ x: 0, y: 285, t: 'w' },
				{ x: 130, y: 285, t: 'w' },
				{ x: 250, y: 350, t: 'h' },
				{ x: 200, y: 55, t: 'h' },
				{ x: 70, y: 155, t: 'w' }
			],
			[
				{ x: 64, y: 352, t: 'h' },
				{ x: 224, y: 352, t: 'h' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 200, y: 52, t: 'h' }
			],
			[
				{ x: 78, y: 352, t: 'h' },
				{ x: 78, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 192, y: 240, t: 'w' },
				{ x: 30, y: 150, t: 'w' },
				{ x: 158, y: 150, t: 'w' }
			],
			[
				{ x: 0, y: 400, t: 'w' },
				{ x: 130, y: 400, t: 'w' },
				{ x: 60, y: 300, t: 'w' },
				{ x: 190, y: 300, t: 'w' },
				{ x: 0, y: 200, t: 'w' },
				{ x: 190, y: 200, t: 'w' },
				{ x: 0, y: 100, t: 'w' },
				{ x: 130, y: 100, t: 'w' }
			],
			[
				{ x: 188, y: 352, t: 'h' },
				{ x: 92, y: 320, t: 'w' },
				{ x: 0, y: 240, t: 'w' },
				{ x: 128, y: 240, t: 'w' },
				{ x: 256, y: 240, t: 'h' },
				{ x: 180, y: 52, t: 'h' },
				{ x: 52, y: 148, t: 'w' }
			]
		];
		for(var i=0; i<this.maxLevels; i++) {
			var newLevel = this.add.group();
			newLevel.enableBody = true;
			newLevel.physicsBodyType = Phaser.Physics.ARCADE;
			for(var e=0; e<this.levelData[i].length; e++) {
				var item = this.levelData[i][e];
				newLevel.create(item.x, item.y, 'element-'+item.t);
			}
			newLevel.setAll('body.immovable', true);
			newLevel.visible = false;
			this.levels.push(newLevel);
		}
	},
	showLevel: function(level) {
		var lvl = level | this.level;
		if(this.levels[lvl-2]) {
			this.levels[lvl-2].visible = false;
		}
		this.levels[lvl-1].visible = true;
	},
	updateCounter: function() { //Update-ar klukkuna hverja sekúndu
		this.timer++;
		this.timerText.setText("Tími: "+this.timer);
		this.totalTimeText.setText("Heildar tími: "+(this.totalTimer+this.timer));
	},
	managePause: function() { //Vinnur með pausa takkan
		this.game.paused = true;
		var pausedText = this.add.text(Ball._WIDTH*0.5, 250, "Game paused,\ntap anywhere to continue.", this.fontMessage);
		pausedText.anchor.set(0.5);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		}, this);
	},
	manageAudio: function() { //Vinnur með mute takkan
		this.audioStatus =! this.audioStatus;
		this.audioButton.animations.play(this.audioStatus);
		if (true) {};
		if (this.audioStatus) { //Ef það er unmute-að þá er spilað theme song
			this.themeSound.play();
		}
		else{ //Þegar það er mute-að er pausað öll hljóð til að stöðva þau
			this.themeSound.pause();
			this.bounceSound.pause();
			this.goalSound.pause();
		}
		
	},
	update: function() { //Vinnur með controlin
		if(this.keys.left.isDown) {
			this.ball.body.velocity.x -= this.movementForce;
		}
		else if(this.keys.right.isDown) {
			this.ball.body.velocity.x += this.movementForce;
		}
		if(this.keys.up.isDown) {
			this.ball.body.velocity.y -= this.movementForce;
		}
		else if(this.keys.down.isDown) {
			this.ball.body.velocity.y += this.movementForce;
		}
		this.physics.arcade.collide(this.ball, this.borderGroup, this.wallCollision, null, this);
		this.physics.arcade.collide(this.ball, this.levels[this.level-1], this.wallCollision, null, this);
		this.physics.arcade.overlap(this.ball, this.hole, this.finishLevel, null, this);
	},
	wallCollision: function() { //Ef þú klessir á veggin er spilað sound og síminn vibrate-ar
		if(this.audioStatus) {
			this.bounceSound.play();
		}
		// Vibration API
		if("vibrate" in window.navigator) {
			window.navigator.vibrate(100);
		}
	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		Ball._player.body.velocity.x += x;
		Ball._player.body.velocity.y += y*0.5;
	},
	finishLevel: function() { //Þegar þú klárar level
		if(this.level >= this.maxLevels) {
			if(this.audioStatus) {
				this.goalSound.play();
			}
			this.totalTimer += this.timer;
			alert('Til hamingju, þú vannst leikinn!\nHeildar tíminn þinn var: '+this.totalTimer+' sekúndur!'); //Birtir að þú vannst leikin
			this.themeSound.pause();
			this.game.state.start('MainMenu');
		}
		else {
			if(this.audioStatus) {
				this.goalSound.play();
			}
			alert('Til hamingju, þú kláraðir borð '+this.level+'!'); //Birtir til hamingju að klára borðið

			//Reset-að allar breytur
			this.totalTimer += this.timer;
			this.timer = 0;
			this.level++;
			this.timerText.setText("Tími: "+this.timer);
			this.totalTimeText.setText("Heildar tími: "+this.totalTimer);
			this.levelText.setText("Borð: "+this.level+" / "+this.maxLevels);
			this.ball.body.x = this.ballStartPos.x;
			this.ball.body.y = this.ballStartPos.y;
			this.ball.body.velocity.x = 0;
			this.ball.body.velocity.y = 0;
			this.showLevel();
		}
	},
	render: function() {
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.hole);
	}
};