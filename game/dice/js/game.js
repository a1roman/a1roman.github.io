class Main {
	
  preload() {
    
    this.load.image('player', 'assets/player.png');
	  this.load.image('enemy1', 'assets/enemy1.png');
	  this.load.image('enemy2', 'assets/enemy2.png');
	  this.load.image('enemy3', 'assets/enemy3.png');
	  //this.load.image('enemy', 'assets/enemy.png');
      //this.load.image('ball', 'assets/coin.png');	 
	  this.load.image('tileset', 'assets/tileset.png');
      this.load.tilemapTiledJSON('map', 'assets/map.json');	  
  }
  
  create() {
	//this.sys.game.canvas.height/2
  
  this.player = this.physics.add.sprite(0, 200, 'player');
	this.player.body.gravity.y = 900;
	this.player.body.velocity.x = 150;

	this.arrow = this.input.keyboard.createCursorKeys();
	this.createWorld();
	
	
	this.enemies = this.physics.add.group();
    this.time.addEvent({
      delay: 500,  
      callback: () => this.addEnemy(),
      loop: true,
    });


  }
  
  update() {
  this.physics.collide(this.player, this.walls);
	
	this.movePlayer(); 	
	
	if (this.physics.overlap(this.player, this.enemies)) {
      this.playerDie();
    }
	
  }


  createWorld() {
    let map = this.add.tilemap('map');
    let tileset = map.addTilesetImage('tileset', 'tileset');
    this.walls = map.createStaticLayer('Tile Layer 1', tileset);
    this.walls.setCollision(1);
  }


  movePlayer() {
	this.player.body.immovable = true;

	var pointer = game.input.activePointer;
	
	if ((this.arrow.space.isDown || pointer.isDown) && this.player.body.onFloor()) {
    var touchX = pointer.x;
    var touchY = pointer.y;
	//this.player.y = pointer.y || this.sys.game.canvas.height*0.5;
    this.player.body.velocity.y = -500;
	}
	
	if(this.player.x > this.sys.game.canvas.width) {
		this.goNextLevel();	
	}

  }

  addEnemy() {
	  
	//this.updateEnemyPosition();
	//let enemy = this.enemies.create(10, 230, 'enemy');
      let positions = [
      { x: 200, y: 100 }, 
      { x: 200, y: 150 }, 
      { x: 200, y: 190 }, 

      { x: 350, y: 100 }, 
      { x: 350, y: 150 },
      { x: 350, y: 190 },

      { x: 500, y: 100 }, 
      { x: 500, y: 150 },   
      { x: 500, y: 190 },   
    ];

  let newPosition = Phaser.Math.RND.pick(positions);
	
	let randEnemyType = Phaser.Math.RND.pick([1, 3]);
  let delta = Phaser.Math.RND.pick([-50, 0]);
  //let randEnemyType = 2;
	//console.log(randEnemyType);

	if (randEnemyType == 1) {
    let enemy = this.enemies.create(newPosition.x + delta, newPosition.y + delta, 'enemy1');
    } else if (randEnemyType == 2 || randEnemyType == 3) {
      let enemy = this.enemies.create(newPosition.x + delta, newPosition.y + delta, 'enemy2');
	} else {
		let enemy = this.enemies.create(newPosition.x + delta, newPosition.y + delta, 'enemy3');
	}
	

  }
  
  
  goNextLevel() {
    this.scene.start('main');
  }
  
  playerDie() {
    this.scene.start('main');
  }
	
};

// Initialize Phaser
let game = new Phaser.Game({
  width: 600,
  height: 300, 
  backgroundColor: '#000000', 
  physics: { default: 'arcade' },
  parent: 'game', 
});

// Add all the scenes
game.scene.add('main', Main);

// Start the 'load' scene
game.scene.start('main');