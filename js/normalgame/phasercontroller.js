
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [ GameScene ]
};

var game = new Phaser.Game(config);
