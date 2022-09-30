class Menu {
  create(data) {
    let score = data.score ? data.score : 0;

    this.add.image(300, 230, 'background');

    let nameLabel = this.add.text(300, 210, 'Super Virus', { font: '50px Arial', fill: '#fff' });
    nameLabel.setOrigin(0.5, 0.5);

    let scoreText = 'score: ' + score;
    let scoreLabel = this.add.text(80, 60, scoreText, { font: '25px Arial', fill: '#fff' });
    scoreLabel.setOrigin(0.5, 0.5);

    //let startText = 'press the up arrow key to start';
	let startText = 'touch the center to start';
    let startLabel = this.add.text(300, 280, startText, { font: '25px Arial', fill: '#fff' });
    startLabel.setOrigin(0.5, 0.5);

    this.upKey = this.input.keyboard.addKey('up');
  }

  update() {
    //if (this.upKey.isDown) {
    //  this.scene.start('play');
    //}
	
	var pointer = game.input.activePointer;
	
	if (pointer.isDown) {
		var touchX = pointer.x;
		var touchY = pointer.y;
			if (touchX > 250 && touchX <350) {
				this.scene.start('play');
			}
    }
	
  }
}
