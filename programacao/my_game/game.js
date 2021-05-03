let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
var bltqnt = 100;
var inst;

let ghostDead = false

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

    inst = new GameText(this, 710, 5, 'x'+bltqnt)


    player = new Player(this, 400, 300, 'playerStand', 0.2, 500)

    ghost = new Ghost(this, 600, 400, 'ghost', 0.2, 0)
    this.physics.moveToObject(ghost.gs, player.ps, 200)

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
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }

    }
    else if (keys.W.isDown && keys.D.isDown) {
        player.jump()
        player.move_right_jump()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else if (keys.W.isDown && keys.A.isDown) {
        player.jump()
        player.move_left_jump()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else if (keys.W.isDown) {
        player.jump()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else if (keys.D.isDown) {
        player.move_right()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else if (keys.A.isDown) {
        player.move_left()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else if (keys.S.isDown) {
        player.sneak()
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
    }
    else {
        if (!ghostDead) { this.physics.moveToObject(ghost.gs, player.ps, 200) }
        player.stand()
    }
    if (Phaser.Input.Keyboard.JustDown(spacebar) && !keys.S.isDown) {
        let bullet = new Bullet(this, player.ps.x, player.ps.y, "id_card")
        bullet.fire(player.pos)

        this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
            ghostDead = true
            ghost.destroy()
            bullet.destroy()
        })
        var bullet = bullets.get();

        if (bullet) {
            bullet.fire(player.ps.body.x, player.ps.body.y, player.pos);
            bltqnt = bltqnt - 1;
            inst.text(bltqnt.toString())
        }
    }
}