class Player {
    constructor(scene, x, y, texture, scale, gravity, audio, player) {
        this.ps = scene.physics.add.sprite(x, y, texture).setScale(0.3)
        this.ps.setGravityY(gravity)
        this.ps.setCollideWorldBounds(true);

        this.pos = 'R'
        this.xSpeed = 300;
        this.isNotJumping = true;
        if(player == 1)
        this.healthBar = new HealthBar(scene, 1050, 17.5);
        else
        this.healthBar2 = new HealthBar(scene, 135, 17.5)
        this.js = audio.js
        this.hs = audio.hs
        this.pss = audio.pss
        this.isThrowing = false
        this.platSneak = 0
        this.forcePunch = false
        this.checkOverlap = false
    }

    damage() {
        this.healthBar.decrease(5)
        this.hs.play()
    }

    move_left() {
        this.checkOverlap = false
        this.isNotJumping = true
        this.pos = 'L';
        if (!this.ps.body.onFloor()) {
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
            this.move_left_jump()
        } else {
            this.ps.body.setSize(262, 690)
            this.ps.body.setOffset(80, 0)
            this.ps.setVelocityX(-this.xSpeed);
            this.ps.anims.play('left', true);
        }
    }

    move_left_jump() {
        this.checkOverlap = false
        this.isNotJumping = false
        this.ps.setVelocityX(-this.xSpeed);
        if (!this.isThrowing) {
            this.ps.body.setOffset(0, 135)
            this.ps.anims.play('jumpL', true);
        }
        this.pos = 'L';
        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.js.play()
            }
        }
    }

    move_right() {
        this.checkOverlap = false
        this.isNotJumping = true
        this.pos = 'R';
        if (!this.ps.body.onFloor()) {
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
            this.move_right_jump()
        } else {
            this.ps.body.setSize(262, 690)
            this.ps.body.setOffset(200, 0)
            this.ps.setVelocityX(this.xSpeed);
            this.ps.anims.play('right', true);
        }
    }

    move_right_jump() {
        this.checkOverlap = false
        this.isNotJumping = false
        this.ps.setVelocityX(this.xSpeed);
        if (!this.isThrowing) {
            this.ps.body.setOffset(0, 135)
            this.ps.anims.play('jump', true);
        }
        this.pos = 'R';
        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.js.play()
            }
        }
    }

    jump() {
        this.checkOverlap = false
        this.forcePunch = false
        this.isNotJumping = false
        if (this.pos == 'R' && !this.isThrowing) {
            this.ps.anims.play('jump', true);
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
        }
        else if (this.pos == 'L' && !this.isThrowing) {
            this.ps.anims.play('jumpL', true);
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
        }

        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.ps.setVelocityY(-780);
                this.ps.setVelocityX(0);
            } else {
                this.ps.setVelocityY(-600);
                this.ps.setVelocityX(0);
                this.js.play()
            }
        }
    }

    sneak() {
        this.checkOverlap = false
        if (this.ps.y > 559 && this.ps.y < 560 && this.ps.body.blocked.down) {
            this.platSneak = 1
            this.ps.y = 605
        }
        else if (this.ps.y > 228 && this.ps.y < 240 && this.ps.body.blocked.down) {
            this.platSneak = 2
            this.ps.y = 275.69
        }
        else if (this.ps.y > 725 && this.ps.body.blocked.down) {
            this.platSneak = 0
            this.ps.y = 776
        }
        this.ps.body.setSize(299, 385)
        this.ps.setVelocityX(0);
        this.ps.anims.play('down', true);
    }

    stand() {
        this.checkOverlap = false
        if (this.platSneak == 1) {
            this.ps.y = 559.94
        }
        else if (this.platSneak == 2) {
            this.ps.y = 229.24
        }
        this.platSneak = 0
        this.ps.body.setSize(262, 690)
        this.ps.body.setOffset(0, 0)
        this.ps.setVelocityX(0);

        if (this.ps.body.onFloor()) {
            this.isNotJumping = true
            if (this.pos == 'R') {
                this.ps.anims.play('stand', true);
            }
            else if (this.pos == 'L') {
                this.ps.anims.play('standL', true);
            }
        } else {
            this.jump()
        }

    }

    standShot(posit) {
        this.checkOverlap = false
        this.posit = posit
        this.pos = posit

        if (this.isNotJumping) {
            this.ps.body.setSize(262, 690)
            this.ps.body.setOffset(0, 0)
            this.ps.setVelocityX(0);
            this.isNotJumping = true
            if (this.pos == 'R') {
                if (posit == 'R') {
                    this.ps.anims.play('stand', true);
                    this.pos = 'R'
                }
                else if (posit == 'L') {
                    this.ps.anims.play('standL', true);
                    this.pos = 'L'
                }
            }
            else if (this.pos == 'L') {
                if (posit == 'L') {
                    this.ps.anims.play('standL', true);
                }
                else if (posit == 'R') {
                    this.ps.anims.play('stand', true);
                }

            }
        }
        else {
            this.ps.setVelocityX(0);
            if (this.ps.body.onFloor()) {
                this.ps.body.setSize(262, 690)
                this.ps.body.setOffset(0, 0)
                if (this.pos == 'R') {
                    if (posit == 'R') {
                        this.ps.anims.play('stand', true);
                        this.pos = 'R'
                    }
                    else if (posit == 'L') {
                        this.ps.anims.play('standL', true);
                        this.pos = 'L'
                    }
                }
                else if (this.pos == 'L') {
                    if (posit == 'L') {
                        this.ps.anims.play('standL', true);
                    }
                    else if (posit == 'R') {
                        this.ps.anims.play('stand', true);
                    }
                }
            }
        }
    }

    combat() {
        this.ps.setVelocityX(0);

        if (this.ps.body.blocked.down || this.forcePunch) {
            this.ps.body.setSize(262, 690)
            this.ps.anims.play(this.pos == 'R' ? 'punching' : 'punchingL', true);
            this.ps.body.setSize(320, 690)
            this.ps.body.setOffset(this.pos == 'R' ? 100 : 0, 0)
        } else if (!this.ps.body.onFloor() && !this.ps.body.blocked.down) {
            this.checkOverlap = true
            this.ps.body.setSize(262, 690)
            this.ps.anims.play(this.pos == 'R' ? 'kicking' : 'kickingL', true);
            this.ps.body.setSize(400, 550)
            this.ps.body.setOffset(this.pos == 'R' ? 150 : -80, -100)
        }
    }

    throwing_card() {
        this.ps.setVelocityX(0);
        this.ps.body.setSize(262, 700)
        this.ps.body.setOffset(this.pos == 'R' ? 70 : 70, 2.5)
        this.isThrowing = true
        this.ps.anims.play(this.pos == 'R' ? 'throw' : 'throwL', true);
    }

    throwing_card_diagonal() {
        this.ps.setVelocityX(0);
        this.ps.body.setSize(262, 700)
        this.ps.body.setOffset(this.pos == 'R' ? 70 : 70, 2.5)
        this.isThrowing = true
        this.ps.anims.play(this.pos == 'R' ? 'throwD' : 'throwDL', true);
    }

    throwing_card_up() {
        this.ps.setVelocityX(0);
        this.ps.body.setSize(262, 700)
        this.ps.body.setOffset(this.pos == 'R' ? 70 : 70, 2.5)
        this.isThrowing = true
        this.ps.anims.play(this.pos == 'R' ? 'throwV' : 'throwVL', true);
    }
}