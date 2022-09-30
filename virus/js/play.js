class Play {

  // Removed the preload Function
  
create() {
   
	
  	this.player = this.physics.add.sprite(80, this.sys.game.canvas.height/2, 'player');
	
	//this.ball = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'ball');


	this.createWorld();
	this.coin = this.physics.add.sprite(150, 120, 'coin');

	this.scoreLabel = this.add.text(60, 60, 'score: 0', { font: '25px Arial', fill: '#fff' });
    this.score = 0; 

	this.enemies = this.physics.add.group();
    this.time.addEvent({
      delay: 2200,  
      callback: () => this.addEnemy(),
      loop: true,
    });

  }

  update() {
    this.physics.collide(this.player, this.walls);
	this.physics.collide(this.enemies, this.walls);
	
	this.movePlayer(); 	

	
	if (this.physics.overlap(this.player, this.coin)) {
		this.takeCoin();
	  }

	if (this.physics.overlap(this.player, this.enemies)) {
		this.playerDie();
	}

	if (this.player.x < 0 || this.player.x > 600) {
		this.playerDie();
	}
  }

  createWorld() {
    let map = this.add.tilemap('map');
    let tileset = map.addTilesetImage('tileset', 'tileset');
    this.walls = map.createStaticLayer('Tile Layer 1', tileset);
    this.walls.setCollision(1);
  }

  takeCoin() {
	//this.coin.destroy();
    this.score += 5;
    this.scoreLabel.setText('score: ' + this.score);

    this.updateCoinPosition();
	this.coin.setScale(0); // Scale the coin to 0 to make it invisible

	// Create a tween
	this.tweens.add({
		targets: this.coin, // on the coin
		scale: 1, // to scale it to 1 (its original size)
		duration: 300, // in 300ms
	  
	});

	this.tweens.add({
		targets: this.player, // on the player
		scale: 1.3, // to scale it to 1.3
		duration: 100, // scale back to 1 in 100ms
		yoyo: true, // then perform the tween in reverse
	  });	
		  
  }

  updateCoinPosition() {
	let positions = [
	{ x: 100, y: 120 },
	{ x: 250, y: 220 },
	{ x: 350, y: 320 },	
	{ x: 400, y: 120 },
	{ x: 100, y: 340 },
	{ x: 250, y: 340 },
	{ x: 350, y: 340 },
	{ x: 400, y: 340 },
 	];
	positions = positions.filter(coin => coin.x !== this.coin.x);
	let newPosition = Phaser.Math.RND.pick(positions);
	this.coin.setPosition(newPosition.x, newPosition.y);
 }

 addEnemy() {
    let enemy = this.enemies.create(10, 230, 'enemy');

    //enemy.body.gravity.x = 100;
	enemy.body.velocity.x = Phaser.Math.RND.pick([30, 100]);
    enemy.body.velocity.y = Phaser.Math.RND.pick([-100, 100]);
    enemy.body.bounce.x = 1;
	enemy.body.bounce.y = 1;

    this.time.addEvent({
      delay: 10000,  
      callback: () => enemy.destroy(),
    });
  }

 playerDie() {
	this.scene.start('main');
	//this.player.destroy();

	//this.emitter.setPosition(this.player.x, this.player.y); // Set the position of the emitter on top of the player
	//this.emitter.explode(); // Start the emitter
	

  } 

  movePlayer() {
	this.player.body.immovable = true;
	
	var pointer = game.input.activePointer;
	
	if (pointer.isDown) {
    var touchX = pointer.x;
    var touchY = pointer.y;
	
	//this.player.y = pointer.y || this.sys.game.canvas.height*0.5;
    
	if (this.player.body.velocity.x == 0) {

		if (this.player.x > pointer.x) {
			this.player.body.velocity.x = -100;
			this.player.body.velocity.y = 0;
		} else {
			this.player.body.velocity.x = 100;
			this.player.body.velocity.y = 0;			
		}

	} else {

		if (this.player.y > pointer.y) {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = -100;
		} else {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 100;			
		}

	}

	
	}
	
  }



    getGoal() {
    this.score += 1;
    this.scoreLabel.setText('score: ' + this.score);
	
	this.player.destroy();
	this.ball.destroy();
	
	this.player = this.physics.add.sprite(80, this.sys.game.canvas.height/2, 'player');
	
	this.ball = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'ball');
	
	this.addBall();
	
	}
	
  addBall() {
    this.ball.body.velocity.x = Phaser.Math.RND.pick([-100, 100])*1;
	this.ball.body.velocity.y = Phaser.Math.RND.pick([-100, 100])*1;
	this.ball.body.bounce.set(1);
  }
  

  playerDie() {
	  this.player.destroy();
    //this.scene.start('main');
	//console.log("playerDie is called !!");
	
	// When the player dies, we go to the menubar
	this.scene.start('menu', { score: this.score });
  }
	
};

// Delete all Phaser initialization code