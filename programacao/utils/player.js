class Player {
    constructor(scene, x, y, texture, scale, gravity, audio) {
        this.ps = scene.physics.add.sprite(x, y, texture).setScale(0.3)
        this.ps.setGravityY(gravity)
        this.ps.setCollideWorldBounds(true);

        this.pos = 'R'
        this.xSpeed = 300;
        this.isNotJumping = true;
        this.healthBar = new HealthBar(scene, 1050, 17.5);
        this.js = audio.js
        this.hs = audio.hs
        this.pss = audio.pss
        this.isThrowing = false
    }

    damage() {
        this.healthBar.decrease(5)
        this.hs.play()
    }

    move_left() {

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
        this.ps.body.setOffset(0, 135)
        this.isNotJumping = false
        this.ps.setVelocityX(-this.xSpeed);
        this.ps.anims.play('jumpL', true);
        this.pos = 'L';
        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.js.play()
            }
        }
    }

    move_right() {

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
        this.ps.body.setOffset(0, 135)
        this.isNotJumping = false
        this.ps.setVelocityX(this.xSpeed);
        this.ps.anims.play('jump', true);
        this.pos = 'R';
        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.js.play()
            }
        }
    }

    jump() {
        this.isNotJumping = false
        if (this.pos == 'R') {
            this.ps.anims.play('jump', true);
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
        }
        else if (this.pos == 'L') {
            this.ps.anims.play('jumpL', true);
            this.ps.body.setSize(300, 555)
            this.ps.body.setOffset(0, 135)
        }

        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.ps.setVelocityY(-700);
                this.ps.setVelocityX(0);
            } else {
                this.ps.setVelocityY(-500);
                this.ps.setVelocityX(0);
                this.js.play()
            }
        }
    }

    sneak() {
        if (this.isNotJumping) {
            this.ps.y = 561
        }
        this.ps.body.setSize(299, 385)
        this.ps.setVelocityX(0);
        this.ps.anims.play('down', true);
    }

    stand() {
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

        if (Math.abs(this.ps.body.velocity.x) < 1 && Math.abs(this.ps.body.velocity.y) < 1) {
            this.ps.body.setSize(262, 690)
            this.ps.anims.play(this.pos == 'R' ? 'punching' : 'punchingL', true);
            this.ps.body.setSize(320, 690)
            this.ps.body.setOffset(this.pos == 'R' ? 100 : 0, 0)
        } else if (!this.ps.body.onFloor()) {
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
}