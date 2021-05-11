class ClassRoom1 extends Phaser.Scene {

    constructor(config) {
        super(config);
        this.keys;
        this.player;
        this.bullets;
        this.bltqnt = 100;
        this.inst;
        this.ghostNumber = 2
        this.ghosts = [];
        this.spacebar;
        this.fireRate = 1000;
        this.timeBefore = 0;
        this.platform
        this.platforms = []
        this.platformsData = {
            0: [505, 590],
            1: [925, 260],
            2: [98, 260],
        }
        this.boss
        this.bossHealth = 100
    }

    init(data) { }
    preload() {
        this.load.image('classroom', '../res/cenario/classroom.jpg');
        this.load.image('table', '../res/cenario/table.png');
        this.load.image('id_card', '../res/sprites/id_card.png')
        this.load.spritesheet('ghostFlying', '../res/ghosts/fantasmasR.png', { frameWidth: 387.5, frameHeight: 297 })
        this.load.spritesheet('ghostFlyingL', '../res/ghosts/fantasmasL.png', { frameWidth: 387.5, frameHeight: 297 })

        this.load.image('boss', '../res/ghosts/fantasma_1.png')
        this.load.spritesheet('bossWalking', '../res/ghosts/fantasma_2.png', { frameWidth: 235.5, frameHeight: 248 });
        this.load.spritesheet('bossDead', '../res/ghosts/fantasma_3.png', { frameWidth: 270, frameHeight: 334 });

        this.load.spritesheet('bossPew', '../res/ghosts/bossPew.png', { frameWidth: 147, frameHeight: 91 });
        this.load.spritesheet('bossPewDead', '../res/ghosts/bossPewDestroy.png', { frameWidth: 198.5, frameHeight: 151 });

        this.load.spritesheet('playerDown', '../res/sprites/down.png', { frameWidth: 249, frameHeight: 375 });
        this.load.spritesheet('playerRunning', '../res/sprites/running.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerRunningL', '../res/sprites/runningL.png', { frameWidth: 515, frameHeight: 686 });
        this.load.spritesheet('playerStand', '../res/sprites/stand.png', { frameWidth: 262, frameHeight: 690 });
        this.load.spritesheet('playerJump', '../res/sprites/jump.png', { frameWidth: 343, frameHeight: 690 });
        this.load.spritesheet('playerJumpL', '../res/sprites/jumpL.png', { frameWidth: 342, frameHeight: 690 });
        this.load.spritesheet('playerStandL', '../res/sprites/standL.png', { frameWidth: 262, frameHeight: 690 });
        this.load.spritesheet('playerPunching', '../res/sprites/punchingR.png', { frameWidth: 430, frameHeight: 689 });
        this.load.spritesheet('playerPunchingL', '../res/sprites/punchingL.png', { frameWidth: 430, frameHeight: 689 });
        this.load.spritesheet('playerKicking', '../res/sprites/kickR.png', { frameWidth: 455, frameHeight: 556 });
        this.load.spritesheet('playerKickingL', '../res/sprites/kickL.png', { frameWidth: 455, frameHeight: 556 });
        this.load.spritesheet('playerThrowing', '../res/sprites/throw.png', { frameWidth: 459, frameHeight: 714 });
        this.load.spritesheet('playerThrowingL', '../res/sprites/throwL.png', { frameWidth: 459, frameHeight: 714 });
        //this.load.spritesheet('player')

        this.load.audio('music', '../res/sons/Sound_Effects/musicadeluta.mp3');
        this.load.audio('punch', '../res/sons/Sound_Effects/punch.mp3');
        this.load.audio('card', '../res/sons/Sound_Effects/card_throw.mp3');
        this.load.audio('jump', '../res/sons/Sound_Effects/jump.mp3');
        this.load.audio('hit', '../res/sons/Sound_Effects/hit.mp3');
        this.load.audio('kick', '../res/sons/Sound_Effects/kick.mp3');
        this.load.audio('die', '../res/sons/Sound_Effects/death_sound.mp3');
    }
    create(data) {
        let bmsc = this.sound.add('music', {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        })
        bmsc.play()


        this.game.config.pss = this.sound.add('punch')
        this.game.config.js = this.sound.add('jump', {
            mute: false,
            volume: 2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        })
        this.game.config.hs = this.sound.add('hit')
        this.game.config.ds = this.sound.add('die')
        this.game.config.idcs = this.sound.add('card', {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        })
        this.game.config.ks = this.sound.add('kick')

        this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT,UP,RIGHT");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.image(1252 / 2, 834 / 2, 'classroom')


        for (let i = 0; i < 3; i++) {
            let platform = this.physics.add.sprite(this.platformsData[i][0], this.platformsData[i][1]).setScale(0.36).refreshBody()
            platform.body.immovable = true;
            platform.body.moves = false;
            platform.body.setSize(750, 450)
            platform.body.setOffset(0, 220)
            this.platforms.push(platform)
        }

        this.anims.create({
            key: 'bossWalk',
            frames: this.anims.generateFrameNumbers("bossWalking"),
            frameRate: 10
        });
        this.anims.create({
            key: 'bossDead',
            frames: this.anims.generateFrameNumbers("bossDead"),
            frameRate: 10
        });
        this.anims.create({
            key: 'bossPew',
            frames: this.anims.generateFrameNumbers("bossPew"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'bossPewDead',
            frames: this.anims.generateFrameNumbers("bossPewDead"),
            frameRate: 10
        });


        this.inst = new GameText(this, 1150, 5, 'x' + this.bltqnt)
        this.player = new Player(this, 400, 561, 'playerStand', 0.2, 500, this.game.config)

        this.randomMinAndMax = (max, min) => Math.floor(Math.random() * (max - (min) + 1)) + min;
        this.randomInterv = (min, max, min2, max2) => this.randomMinAndMax(1, 0) == 0 ? this.randomMinAndMax(min, max) : this.randomMinAndMax(min2, max2)

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers("ghostFlying"),
            frameRate: 10
        })

        this.anims.create({
            key: 'flyL',
            frames: this.anims.generateFrameNumbers("ghostFlyingL"),
            frameRate: 10
        })

        for (let i = 0; i < this.ghostNumber; i++) {
            this.ghosts.push(new Ghost(this, this.randomInterv(-200, -50, 650, 850), this.randomMinAndMax(-200, 400), 'ghostFlying', 0.3, 0))
        }

        this.boss = new Ghost(this, 1150, 500, 'boss', 1.2, -350)

        this.moveGhosts = () => {
            if (Math.abs(this.player.ps.y) - 1 < Math.abs(this.boss.gs.y) && Math.abs(this.player.ps.y) + 1 > Math.abs(this.boss.gs.y)) {
                this.physics.moveTo(this.boss.gs, 1150, this.boss.gs.y)
                let bossPew = new Ghost(this, 1150, this.boss.gs.y, 'bossPew', 0.5, -350)
                this.physics.moveTo(bossPew.gs, this.player.ps.x, this.player.ps.y)
                bossPew.gs.play('bossPew')
                this.physics.add.collider(this.player.ps, bossPew.gs, (player, ghost) => {
                    if (player.width == 430 || player.height < 560) {
                        if (player.body.touching.up && player.height > 560) {
                            this.player.damage()
                        }
                        if ((player.body.touching.left && this.player.pos == 'L') || (player.body.touching.right && this.player.pos == 'R')) {
                            this.bltqnt += 8
                            this.inst.setNewText('x' + this.bltqnt.toString())
                            ghost.destroy()
                            if (player.body.onFloor()) {
                                this.game.config.pss.play()
                            }
                            else {
                                this.game.config.ks.play()
                            }

                        }
                        else {
                            this.player.damage()
                        }
                    }
                    else {
                        this.player.damage()
                        ghost.destroy()
                    }
                })

            } else {
                this.physics.moveTo(this.boss.gs, 1150, this.player.ps.y)
            }
            this.ghosts.forEach(ghost => {
                if (ghost.gs.isAlive) {
                    this.physics.moveToObject(ghost.gs, this.player.ps, 50)
                    let angleBetween = (obj1, obj2) => {
                        var angleDeg = (Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI);
                        return angleDeg;
                    }
                    if ((angleBetween(this.player.ps, ghost.gs) <= 90 && angleBetween(this.player.ps, ghost.gs) >= 0) || (angleBetween(this.player.ps, ghost.gs) >= -90 && angleBetween(this.player.ps, ghost.gs) <= 0)) {
                        ghost.gs.play('flyL', true)
                    }
                    else if ((angleBetween(this.player.ps, ghost.gs) < -90 && angleBetween(this.player.ps, ghost.gs) >= -180) || (angleBetween(this.player.ps, ghost.gs) > 90 && angleBetween(this.player.ps, ghost.gs) <= 180)) {
                        ghost.gs.play('fly', true)
                    }
                }
            });
        }

        this.platforms.forEach((plat) => {
            this.physics.add.collider(this.player.ps, plat, (player, plat) => {
            })
            this.physics.add.overlap(this.player.ps, plat, () => {
                if (this.player.checkOverlap) {
                    if (this.player.ps.y > 611 && this.player.ps.y < 612) {
                        this.player.ps.y = 559.94
                    } else if (this.player.ps.y > 281 && this.player.ps.y < 283) {
                        this.player.ps.y = 229.24
                    }
                    this.player.forcePunch = true
                }
            })
        })

        this.ghosts.forEach(ghost => {
            this.physics.add.collider(this.player.ps, ghost.gs, (player, ghost) => {
                if (player.width == 430 || player.height < 560) {
                    if (player.body.touching.up && player.height > 560) {
                        this.player.damage()
                    }
                    if ((player.body.touching.left && this.player.pos == 'L') || (player.body.touching.right && this.player.pos == 'R')) {
                        ghost.isAlive = false
                        this.bltqnt += 8
                        this.inst.setNewText('x' + this.bltqnt.toString())
                        ghost.destroy()
                        if (player.body.onFloor()) {
                            this.game.config.pss.play()
                        }
                        else {
                            this.game.config.ks.play()
                        }

                    }
                    else {
                        this.player.damage()
                    }
                }
                else {
                    this.player.damage()
                    ghost.isAlive = false
                    ghost.destroy()
                }

            })
        });

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
            frameRate: 10,
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
        this.anims.create({
            key: 'punching',
            frames: this.anims.generateFrameNumbers("playerPunching"),
            frameRate: 10
        });
        this.anims.create({
            key: 'punchingL',
            frames: this.anims.generateFrameNumbers("playerPunchingL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'kicking',
            frames: this.anims.generateFrameNumbers("playerKicking"),
            frameRate: 10
        });
        this.anims.create({
            key: 'kickingL',
            frames: this.anims.generateFrameNumbers("playerKickingL"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers("playerThrowing"),
            frameRate: 10
        });
        this.anims.create({
            key: 'throwL',
            frames: this.anims.generateFrameNumbers("playerThrowingL"),
            frameRate: 10
        });

    }

    update(time, delta) {
        this.moveGhosts()

        if ((((new Date().getTime()) - this.timeBefore) > this.fireRate - 200) && this.player.isThrowing) {
            this.player.isThrowing = false
        }

        if (this.keys.SHIFT.isDown && this.keys.A.isDown) {
            if (this.player.isThrowing) {
                this.player.throwing_card()
            }
            else {
                if (this.keys.RIGHT.isDown) {
                    this.player.combat()
                } else {
                    this.player.standShot('L')
                }
            }
        }
        else if (this.keys.SHIFT.isDown && this.keys.D.isDown) {
            if (this.player.isThrowing) {
                this.player.throwing_card()
            } else {
                if (this.keys.RIGHT.isDown) {
                    this.player.combat()
                }
                else {
                    this.player.standShot('R')
                }
            }
        }
        else if (this.keys.SHIFT.isDown) {
            if (this.player.isThrowing) {
                this.player.throwing_card()
            } else {
                this.player.standShot(this.player.pos)
            }
        }
        else if (this.keys.RIGHT.isDown) {
            this.player.combat()
        }
        else if (this.keys.SHIFT.isDown) {
            this.player.standShot()
            if (this.keys.RIGHT.isDown) {
                this.player.combat()
            }
        }
        else if (this.keys.A.isDown && this.keys.D.isDown && !this.keys.RIGHT.isDown) {
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
        else if (this.keys.D.isDown && !this.keys.S.isDown) {
            this.player.move_right()
        }
        else if (this.keys.A.isDown && !this.keys.S.isDown) {
            this.player.move_left()
        }
        else if (this.keys.S.isDown) {
            this.player.sneak()
        }
        else {
            if (this.player.isThrowing) {
                this.player.throwing_card()
            } else {
                this.player.stand()
            }
        }
        if (this.keys.UP.isDown && !this.keys.S.isDown && !this.keys.RIGHT.isDown) {
            if (((new Date().getTime()) - this.timeBefore) > this.fireRate) {
                this.timeBefore = new Date().getTime()
                if (this.bltqnt > 0) {
                    this.bltqnt = this.bltqnt - 1;
                    this.inst.setNewText('x' + this.bltqnt.toString())

                    let bullet;
                    let newBullet = () => bullet = new Bullet(this, this.player.ps.x, this.player.ps.y, "id_card", 0.4, this.game.config.idcs)
                    let collider = true

                    if (this.keys.SHIFT.isDown && (this.keys.D.isDown || this.keys.A.isDown) && this.keys.W.isDown) {
                        newBullet()
                        bullet.fireDiagonally(this.player.pos)
                    }
                    else if (this.keys.SHIFT.isDown && this.player.ps.body.onFloor() && this.keys.W.isDown) {
                        newBullet()
                        bullet.fireUp()
                    }
                    else {
                        collider = false
                        this.player.throwing_card()
                        setTimeout(() => {
                            newBullet()
                            bullet.fire(this.player.pos)
                            this.ghosts.forEach(ghost => {
                                this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                                    ghost.isAlive = false
                                    ghost.destroy()
                                    this.game.config.ds.play()
                                    bullet.destroy()
                                })
                            });
                            this.physics.add.collider(bullet.bullet, this.boss.gs, (bullet, ghost) => {
                                this.bossHealth -= 1
                                bullet.destroy()
                            })
                        }, 400);
                    }

                    if (collider)
                        this.ghosts.forEach(ghost => {
                            this.physics.add.collider(bullet.bullet, ghost.gs, (bullet, ghost) => {
                                ghost.isAlive = false
                                ghost.destroy()
                                this.game.config.ds.play()
                                bullet.destroy()
                            })
                        });
                }
            }
        }
    }

}