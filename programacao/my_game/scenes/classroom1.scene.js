class ClassRoom1 extends Phaser.Scene {

    constructor(config) {
        super(config);
        this.keys;
        this.player;
        this.bullets;
        this.bltqnt = 100;
        this.inst;
        this.ghostNumber = 10
        this.ghosts = [];
        this.spacebar;
        this.img;
    }

    init(data) { }
    preload() {
        this.load.image('classroom', '../res/cenario/classroom.png');
        this.load.image('id_card', '../res/cenario/id_card.png')
        this.load.image('ghost', '../res/ghosts/ghost.png')
        this.load.image('aim', '../res/cenario/aim.png')

        this.load.spritesheet('playerDown', '../res/sprites/down.png', { frameWidth: 249, frameHeight: 375 });
        this.load.spritesheet('playerRunning', '../res/sprites/running.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerRunningL', '../res/sprites/runningL.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerStand', '../res/sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
        this.load.spritesheet('playerJump', '../res/sprites/jump.png', { frameWidth: 343, frameHeight: 690 });
        this.load.spritesheet('playerJumpL', '../res/sprites/jumpL.png', { frameWidth: 342, frameHeight: 690 });
        this.load.spritesheet('playerStandL', '../res/sprites/standL.png', { frameWidth: 262, frameHeight: 690 });

    }
    create(data) {
        this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.image(400, 300, 'classroom').setScale(1.5)
        this.img = this.add.image(400, 300, 'aim').setScale(0.06)

        this.inst = new GameText(this, 710, 5, 'x' + this.bltqnt)
        this.player = new Player(this, 400, 561, 'playerStand', 0.2, 500)

        this.randomMinAndMax = (max, min) => Math.floor(Math.random() * (max - (min) + 1)) + min;
        this.randomInterv = (min, max, min2, max2) => this.randomMinAndMax(1, 0) == 0 ? this.randomMinAndMax(min, max) : this.randomMinAndMax(min2, max2)


        for (let i = 0; i < this.ghostNumber; i++) {
            this.ghosts.push(new Ghost(this, this.randomInterv(-200, -50, 650, 850), this.randomMinAndMax(-200, 400), 'ghost', 0.2, 0))
        }

        this.moveGhosts = () => {
            this.ghosts.forEach(ghost => {
                if (ghost.gs.isAlive) {
                    this.physics.moveToObject(ghost.gs, this.player.ps, 50)
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
    update(time, delta) {

        this.moveGhosts()

        img.rotation += 0.01;

        if (keys.SHIFT.isDown) {
            player.standShot()
        }

        if (keys.SHIFT.isDown && keys.A.isDown) {

            player.standShot()
        }

        if (this.keys.A.isDown && this.keys.D.isDown) {
            this.player.stand()
        }
        else if (this.keys.W.isDown && this.keys.D.isDown) {
            this.player.jump()
            this.player.move_right_jump()
        }
        else if (this.keys.W.isDown && this.keys.A.isDown) {
            this.player.jump()
            this.player.move_left_jump()
        }
        else if (this.keys.W.isDown) {
            this.player.jump()
        }
        else if (this.keys.D.isDown) {
            this.player.move_right()
        }
        else if (this.keys.A.isDown) {
            this.player.move_left()
        }
        else if (this.keys.S.isDown) {
            this.player.sneak()
        }
        else {
            this.player.stand()
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.keys.S.isDown) {
            if (this.bltqnt > 0) {
                this.bltqnt = this.bltqnt - 1;
                this.inst.setNewText('x' + this.bltqnt.toString())
                let bullet = new Bullet(this, this.player.ps.x, this.player.ps.y, "id_card")
                bullet.fire(this.player.pos)

                this.ghosts.forEach(ghost => {
                    this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                        ghost.isAlive = false
                        ghost.destroy()
                        bullet.destroy()
                    })
                });
            }
        }
    }

}