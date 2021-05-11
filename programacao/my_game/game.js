let config = {
    type: Phaser.AUTO,
    width: 1252,
    height: 834,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 350 }
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