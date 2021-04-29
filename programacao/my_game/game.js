let config = {
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
let ghost;

function preload() {
    this.load.image('classroom', '../../res/cenario/classroom.png');
    this.load.image('id_card', '../../res/cenario/id_card.png')
    this.load.image('ghost', '../../res/ghosts/ghost.png')

    this.load.spritesheet('playerDown', '../../res/sprites/down.png', { frameWidth: 249, frameHeight: 690 });
    this.load.spritesheet('playerRunning', '../../res/sprites/running.png', { frameWidth: 515, frameHeight: 690 });
    this.load.spritesheet('playerRunningL', '../../res/sprites/runningL.png', { frameWidth: 515, frameHeight: 690 });
    this.load.spritesheet('playerStand', '../../res/sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
    this.load.spritesheet('playerJump', '../../res/sprites/jump.png', { frameWidth: 343, frameHeight: 690 });
    this.load.spritesheet('playerJumpL', '../../res/sprites/jumpL.png', { frameWidth: 342, frameHeight: 690 });
    this.load.spritesheet('playerStandL', '../../res/sprites/standL.png', { frameWidth: 262, frameHeight: 690 });
}

function create() {

    keys = this.input.keyboard.addKeys("W,A,S,D");
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.add.image(400, 300, 'classroom').setScale(1.5)

    player = new Player(this, 400, 300, 'playerStand', 0.2, 500)

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 100,
        runChildUpdate: true
    });

    ghost = new Ghost(this, 600, 400, 'ghost', 0.2, 0)
    this.physics.moveToObject(ghost.gs, player.ps, 200)


    this.physics.add.overlap(bullets, ghost.gs, (bullets, ghost) => {
        ghost.destroy()
        console.log(32)
    })

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
        key: 'jumpL',
        frames: this.anims.generateFrameNumbers("playerJumpL"),
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
        player.stand()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.W.isDown && keys.D.isDown)
    {
        player.jump()
        player.move_right_jump()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.W.isDown && keys.A.isDown)
    {
        player.jump()
        player.move_left_jump()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.W.isDown) {
        player.jump()       
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.D.isDown) {
        player.move_right()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.A.isDown) {
        player.move_left()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else if (keys.S.isDown) {
        player.sneak()
        this.physics.moveToObject(ghost.gs, player.ps, 200)
    }
    else {
        this.physics.moveToObject(ghost.gs, player.ps, 200)
        player.stand()
    }
    if (Phaser.Input.Keyboard.JustDown(spacebar) && !keys.S.isDown) {
        var bullet = bullets.get();

        if (bullet) {
            bullet.fire(player.ps.body.x, player.ps.body.y, player.pos);
        }
    }
}