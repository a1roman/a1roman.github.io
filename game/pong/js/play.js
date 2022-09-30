class Play {

  // Removed the preload Function
  
create() {
   
	
  	this.player = this.physics.add.sprite(80, this.sys.game.canvas.height/2, 'player');
	this.enemy = this.physics.add.sprite(this.sys.game.canvas.width-80, this.sys.game.canvas.height/2, 'enemy');
	
	this.ball = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'ball');

	this.addBall();
	
	//this.arrow = this.input.keyboard.createCursorKeys();
	this.createWorld();

	this.scoreLabel = this.add.text(60, 60, 'score: 0', { font: '25px Arial', fill: '#fff' });
    this.score = 0; 
	
  }

  update() {
    this.physics.collide(this.player, this.walls);
	this.physics.collide(this.ball, this.walls);	
	this.physics.collide(this.ball, this.player);
	this.physics.collide(this.ball, this.enemy);
	
	this.movePlayer(); 	
	this.moveBall();
	
	this.moveEnemy();
	
  }

  createWorld() {
    let map = this.add.tilemap('map');
    let tileset = map.addTilesetImage('tileset', 'tileset');
    this.walls = map.createStaticLayer('Tile Layer 1', tileset);
    this.walls.setCollision(1);
  }


  movePlayer() {
	this.player.body.immovable = true;

/*
    if (this.arrow.up.isDown) {
      this.player.body.velocity.y = -300;
    } else if (this.arrow.down.isDown) {
      this.player.body.velocity.y = 300;
    } else {
      this.player.body.velocity.x = 0;
    }
*/
	
	var pointer = game.input.activePointer;
	
	if (pointer.isDown) {
    var touchX = pointer.x;
    var touchY = pointer.y;
	this.player.y = pointer.y || this.sys.game.canvas.height*0.5;
    
	// Player - Check paddle within top and bottom walls
	
	if (pointer.y < 70) {
		this.player.y = 70;
	} else if (pointer.y > this.sys.game.canvas.height - 20 - 100/2) {
		this.player.y = this.sys.game.canvas.height - 20 - 100/2;
	}
	
	}
	
  }

	moveEnemy() {
		this.enemy.body.immovable = true;
		
		this.enemy.y = this.enemy.y + Phaser.Math.RND.pick([-10, 10]);
		
			// Enemy - Check paddle within top and bottom walls
	
		if (this.enemy.y < 120) {
			this.enemy.y = 120;
		} else if (this.enemy.y > this.sys.game.canvas.height - 70 - 100/2) {
			this.enemy.y = this.sys.game.canvas.height - 70 - 100/2;
		}
		
	
	}

    getGoal() {
    this.score += 1;
    this.scoreLabel.setText('score: ' + this.score);
	//this.scene.start('play', { score: this.score });
	
	this.player.destroy();
	this.ball.destroy();
	
	this.player = this.physics.add.sprite(80, this.sys.game.canvas.height/2, 'player');
	//this.enemy = this.physics.add.sprite(this.sys.game.canvas.width-80, this.sys.game.canvas.height/2, 'enemy');
	
	this.ball = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'ball');
	
	this.addBall();
	
	}
	
  addBall() {
    //let ball = this.ball.create(350, 230, 'ball');

    this.ball.body.velocity.x = Phaser.Math.RND.pick([-100, 100])*3;
	this.ball.body.velocity.y = Phaser.Math.RND.pick([-100, 100])*3;
	this.ball.body.bounce.set(1);
	
  }
  
  
  moveBall() {

	//console.log("this.ball.x: "+this.ball.x);
	
	if(this.ball.x < 0) {
		this.playerDie();	
	} else if(this.ball.x > 600) {
	  this.getGoal();
	  // go to play scene
	}
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