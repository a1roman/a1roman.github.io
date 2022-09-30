// Initialize Phaser (no changes)
let game = new Phaser.Game({
  width: 600,
  height: 460,
  backgroundColor: '#ff9c00', 
  physics: { default: 'arcade' },
  parent: 'game', 
});

// Add all the scenes
game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('play', Play);

// Start the 'load' scene
game.scene.start('load');