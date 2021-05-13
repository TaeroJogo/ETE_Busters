let config = {//DEFINA A CONFIGURAÇÂO GLOBAL DO JOGO
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
    scene: [MenuScreen, ClassRoom1],//CENAS
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