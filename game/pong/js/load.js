class Load {
	preload() {
	  this.load.image('background', 'assets/background.png');
      this.load.image('player', 'assets/player.png');
	  this.load.image('enemy', 'assets/enemy.png');
      this.load.image('ball', 'assets/ball.png');	 
	  this.load.image('tileset', 'assets/tileset.png');
      this.load.tilemapTiledJSON('map', 'assets/map.json');	 

  
	// Display a loading label
	let loadLabel = this.add.text(150, 230, 'loading',
	{ font: '30px Arial', fill: '#fff' });
	
	// Change origin point of the Text
	// Centred the Text on the screen
	loadLabel.setOrigin(0.5, 0.5);
  }
  
  create() {
	// Start the menu scene
	this.scene.start('menu');
  }
}