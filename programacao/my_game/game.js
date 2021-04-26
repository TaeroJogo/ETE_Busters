var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);
let keys;
let pos = 'R';

let player;
let bullets;

function preload() {
    this.load.image('classroom', '../../cenario/classroom.png');
    this.load.spritesheet('playerDown', '../../sprites/down.png', { frameWidth: 249, frameHeight: 690 });
    this.load.spritesheet('playerRunning', '../../sprites/running.png', { frameWidth: 515, frameHeight: 690 });
    this.load.spritesheet('playerRunningL', '../../sprites/runningL.png', { frameWidth: 515, frameHeight: 690 });
    this.load.spritesheet('playerStand', '../../sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
    this.load.spritesheet('playerJump', '../../sprites/jump.png', { frameWidth: 343, frameHeight: 545 });
    this.load.spritesheet('playerStandL', '../../sprites/standL.png', { frameWidth: 262, frameHeight: 690 });
}

function create() {

    keys = this.input.keyboard.addKeys("W,A,S,D");

    this.add.image(400, 300, 'classroom').setScale(1.5)

    player = this.physics.add.sprite(801, 450, 'playerStand').setScale(0.2)
    player.setGravityY(500)
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers("playerRunning"),
        frameRate: 10
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers("playerDown"),
        frameRate: 10
    });
    this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers("playerStand"),
        frameRate: 10
    });
    this.anims.create({
        key: 'standL',
        frames: this.anims.generateFrameNumbers("playerStandL"),
        frameRate: 10
    })
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers("playerJump"),
        frameRate: 10
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers("playerRunningL"),
        frameRate: 10
    });
}

function update() {

    if (keys.A.isDown && keys.D.isDown) {
        player.setVelocityX(0);
        player.anims.play('stand', true);
    }
    else if (keys.W.isDown && player.body.y == 462) {
        player.setVelocityY(-400);
        player.setVelocityX(0);
        player.anims.play('jump', true);
    }
    else if (keys.D.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        pos = 'R';
    }
    else if (keys.A.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        pos = 'L';
    }
    else if (keys.S.isDown) {
        player.setVelocityX(0);
        player.anims.play('down', true);
    }
    else {
        player.setVelocityX(0);
        if (pos == 'R') {
            player.anims.play('stand', true);
        }
        else if (pos == 'L') {
            player.anims.play('standL', true);
        }
    }
}