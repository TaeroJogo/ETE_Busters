let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 660,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        }
    },
    scene: [ClassRoom1],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    idcs: '',
    pss: '',
    js: '',
    hs: '',
    ks: '',
    ds: ''
};

let game = new Phaser.Game(config);
game.config.idcs;