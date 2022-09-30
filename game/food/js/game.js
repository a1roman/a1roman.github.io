class Main {
  preload() {
    this.load.image('background', 'assets/background.png');
    //this.load.image('player', 'assets/player.png');
	//this.load.image('player', 'assets/shit.png');
	
	this.load.spritesheet('player', 'assets/shit2.png', {
		  frameWidth: 24,
		  frameHeight: 28,
	});
	
	
    this.load.image('coin', 'assets/coin.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('wallV', 'assets/wallVertical.png');
    this.load.image('wallH', 'assets/wallHorizontal.png'); 
	this.load.image('wallHS', 'assets/wallHorizontalSmall.png'); 
  }
  
  create() {
    this.player = this.physics.add.sprite(100, 140, 'player');
	this.player.body.gravity.y = 540;

	this.anims.create({
      key: 'right',
	  frames: this.anims.generateFrameNumbers('player', {frames: [1, 1]}),
	  frameRate: 8,
	  reapeat: -1,
	});
	this.anims.create({
      key: 'left',
	  frames: this.anims.generateFrameNumbers('player', {frames: [2, 2]}),
	  frameRate: 8,
	  reapeat: -1,
	});
	
	this.arrow = this.input.keyboard.createCursorKeys();
	
	this.createWorld();
	
	this.coin = this.physics.add.sprite(40, 50, 'coin');
	
	// Food at upper level (try positions)
	//this.coin = this.physics.add.sprite(40, 50, 'coin');
	//this.coin = this.physics.add.sprite(100, 70, 'coin');
	//this.coin = this.physics.add.sprite(160, 50, 'coin');
	
	// Food at lower level (try positions)
	//this.coin = this.physics.add.sprite(40, 140, 'coin');
	//this.coin = this.physics.add.sprite(100, 140, 'coin');
	//this.coin = this.physics.add.sprite(160,140, 'coin');
	
	this.scoreLabel = this.add.text(65, 180, 'score: 0', { font: '18px Arial', fill: '#fff' });
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

    if (!this.player.active) {
      return;
    }

    this.movePlayer(); 

    if (this.physics.overlap(this.player, this.coin)) {
      this.takeCoin();
    }

    if (this.player.y < 0) {
      this.playerDie();
    }

    if (this.physics.overlap(this.player, this.enemies)) {
      this.playerDie();
    }
  }
 
  createWorld() {
    this.walls = this.physics.add.staticGroup();

	// walls on two sides
	this.walls.create(10, 100, 'wallV');
	this.walls.create(190, 100, 'wallV');
	
	// ceiling and floor at bottom
	//this.walls.create(100, 10, 'wallH');
	this.walls.create(40, 10, 'wallHS');
	this.walls.create(160, 10, 'wallHS');
	this.walls.create(100, 190, 'wallH');
	
	// middle floor
	this.walls.create(100, 100, 'wallHS');
	
	// two side floors in lower level
	//this.walls.create(510, 250, 'wallH');
	//this.walls.create(-10, 250, 'wallH');
	
	// middle floor in upper level
	//this.walls.create(250, 180, 'wallH');
  } 
  
  takeCoin() {
	//this.coin.destroy();
    this.score += 5;
    this.scoreLabel.setText('score: ' + this.score);

    this.updateCoinPosition();
  }
 

  updateCoinPosition() {
    let positions = [
      { x: 40, y: 50 }, 
      { x: 100, y: 70 }, 
      { x: 160, y: 50 }, 
      { x: 40, y: 140 }, 
      { x: 100, y: 140 }, 
      { x: 160, y: 140 },
    ];
	
    positions = positions.filter(coin => coin.x !== this.coin.x);

    let newPosition = Phaser.Math.RND.pick(positions);

    this.coin.setPosition(newPosition.x, newPosition.y);
  }
 
   addEnemy() {
    let enemy = this.enemies.create(100, -10, 'enemy');

    enemy.body.gravity.y = 400;
    enemy.body.velocity.x = Phaser.Math.RND.pick([-40, 40]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({
      delay: 4000,  
      callback: () => enemy.destroy(),
    });
  }
  
  playerDie() {
    this.scene.start('main');
  }  
  movePlayer() {
    if (this.arrow.left.isDown) {
      this.player.body.velocity.x = -200;
	  this.player.anims.play('left', true); // left animation
    } else if (this.arrow.right.isDown) {
      this.player.body.velocity.x = 200;
	  this.player.anims.play('right', true); // right animation
    } else {
      this.player.body.velocity.x = 0;
    }

    if (this.arrow.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -320;
    }
  }
 
};
 
let game = new Phaser.Game({
  width: 200,
  height: 200, 
  backgroundColor: '#8bac0f', 
  physics: { default: 'arcade' },
  parent: 'game', 
  
  // New code below for Mobile
  //scale: {
  // 	  mode: Phaser.Scale.FIT,
  //autoCenter: Phaser.Scale.CENTER_BOTH,
  //},  
});

game.scene.add('main', Main);
game.scene.start('main');