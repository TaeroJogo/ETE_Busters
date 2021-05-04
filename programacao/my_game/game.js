let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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

let img;

var bltqnt = 100;
var inst;

ghostNumber = 0
let ghosts = [];

function preload() {
    this.load.image('classroom', '../../res/cenario/classroom.png');
    this.load.image('id_card', '../../res/cenario/id_card.png')
    this.load.image('ghost', '../../res/ghosts/ghost.png')
    this.load.image('aim', '../../res/cenario/aim.png')

    this.load.spritesheet('playerDown', '../../res/sprites/down.png', { frameWidth: 249, frameHeight: 375 });
    this.load.spritesheet('playerRunning', '../../res/sprites/running.png', { frameWidth: 515, frameHeight: 686 });
    this.load.spritesheet('playerRunningL', '../../res/sprites/runningL.png', { frameWidth: 515, frameHeight: 686 });
    this.load.spritesheet('playerStand', '../../res/sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
    this.load.spritesheet('playerJump', '../../res/sprites/jump.png', { frameWidth: 343, frameHeight: 690 });
    this.load.spritesheet('playerJumpL', '../../res/sprites/jumpL.png', { frameWidth: 342, frameHeight: 690 });
    this.load.spritesheet('playerStandL', '../../res/sprites/standL.png', { frameWidth: 262, frameHeight: 690 });
}

function create() {


    keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT");
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.add.image(400, 300, 'classroom').setScale(1.5)
    img = this.add.image(400,300, 'aim').setScale(0.06)

    inst = new GameText(this, 710, 5, 'x' + bltqnt)
    player = new Player(this, 400, 561, 'playerStand', 0.2, 500)

    this.randomMinAndMax = (max, min) => Math.floor(Math.random() * (max - (min) + 1)) + min;
    this.randomInterv = (min, max, min2, max2) => this.randomMinAndMax(1, 0) == 0 ? this.randomMinAndMax(min, max) : this.randomMinAndMax(min2, max2)


    for (let i = 0; i < ghostNumber; i++) {
        ghosts.push(new Ghost(this, this.randomInterv(-200, -50, 650, 850), this.randomMinAndMax(-200, 400), 'ghost', 0.2, 0))
    }

    this.moveGhosts = () => {
        ghosts.forEach(ghost => {
            if (ghost.gs.isAlive) {
                this.physics.moveToObject(ghost.gs, player.ps, 50)
            }
        });
    }


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

    this.moveGhosts()

    img.rotation += 0.01;

    if (keys.SHIFT.isDown) {
        player.standShot()
    }

    if (keys.SHIFT.isDown && keys.A.isDown) {

        player.standShot()
    }

    else if (keys.A.isDown && keys.D.isDown) {
        player.stand()
    }
    else if (keys.W.isDown && keys.D.isDown) {
        player.jump()
        player.move_right_jump()
    }
    else if (keys.W.isDown && keys.A.isDown) {
        player.jump()
        player.move_left_jump()
    }
    else if (keys.W.isDown) {
        player.jump()
    }
    else if (keys.D.isDown) {
        player.move_right()
    }
    else if (keys.A.isDown) {
        player.move_left()
    }
    else if (keys.S.isDown) {
        player.sneak()
    }
    else {
        player.stand()
    }
    if (Phaser.Input.Keyboard.JustDown(spacebar) && !keys.S.isDown) {
        if (bltqnt > 0) {
            bltqnt = bltqnt - 1;
            inst.setNewText('x' + bltqnt.toString())
            let bullet = new Bullet(this, player.ps.x, player.ps.y, "id_card")
            bullet.fire(player.pos)

            ghosts.forEach(ghost => {
                this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                    ghost.isAlive = false
                    ghost.destroy()
                    bullet.destroy()
                })
            });
        }
    }
}