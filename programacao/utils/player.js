class Player {
    constructor(scene, x, y, texture, scale, gravity) {
        this.ps = scene.physics.add.sprite(x, y, texture).setScale(scale)
        this.ps.setGravityY(gravity)
        this.ps.setCollideWorldBounds(true);

        this.pos = 'R'
        this.xSpeed = 300;
        this.isNotJumping = true;

        this.healthBar = new HealthBar(scene, x, y);
    }

    move_left() {
        this.ps.body.setSize(262, 690)
        this.ps.body.setOffset(80, 0)
        this.isNotJumping = true
        this.pos = 'L';
        if (!this.ps.body.onFloor()) {
            this.move_left_jump()
        } else {
            this.ps.setVelocityX(-this.xSpeed);
            this.ps.anims.play('left', true);
            this.healthBar.updateLocation(this.ps.x - 55, this.ps.y - 100)
        }
    }

    move_left_jump() {
        this.ps.body.setOffset(0, 0)
        this.isNotJumping = false
        this.ps.setVelocityX(-this.xSpeed);
        this.ps.anims.play('jumpL', true);
        this.pos = 'L';
        this.healthBar.updateLocation(this.ps.x - 35, this.ps.y - 70)
    }

    move_right() {
        this.ps.body.setSize(262, 690)
        this.ps.body.setOffset(200, 0)
        this.isNotJumping = true
        this.pos = 'R';
        if (!this.ps.body.onFloor()) {
            this.move_right_jump()
        } else {
            this.ps.setVelocityX(this.xSpeed);
            this.ps.anims.play('right', true);
            this.healthBar.updateLocation(this.ps.x - 10, this.ps.y - 100)
        }
    }

    move_right_jump() {
        this.ps.body.setOffset(0, 0)
        this.isNotJumping = false
        this.ps.setVelocityX(this.xSpeed);
        this.ps.anims.play('jump', true);
        this.pos = 'R';
        this.healthBar.updateLocation(this.ps.x - 35, this.ps.y - 70)
    }

    jump() {
        this.isNotJumping = false
        if (this.pos == 'R') {
            this.ps.anims.play('jump', true);
            this.ps.body.setSize(300, 690)
        }
        else if (this.pos == 'L') {
            this.ps.anims.play('jumpL', true);
            this.ps.body.setSize(300, 690)
        }

        if (this.ps.body.onFloor()) {
            if (Math.abs(this.ps.body.velocity.x) == 300) {
                this.ps.setVelocityY(-500);
                this.ps.setVelocityX(0);
            } else {
                this.ps.setVelocityY(-400);
                this.ps.setVelocityX(0);
            }
        }
        this.healthBar.updateLocation(this.ps.x - 35, this.ps.y - 70)
    }

    sneak() {
        if (this.isNotJumping) {
            this.ps.y = 561
        }
        this.ps.body.setSize(299, 385)
        this.ps.setVelocityX(0);
        this.ps.anims.play('down', true);
        this.healthBar.updateLocation(this.ps.x - 40, this.ps.y - 50)
    }

    stand() {
        this.ps.body.setSize(262, 690)
        this.ps.setVelocityX(0);

        if (this.ps.body.onFloor()) {
            this.isNotJumping = true
            this.healthBar.updateLocation(this.ps.x - 40, this.ps.y - 100)
            if (this.pos == 'R') {
                this.ps.anims.play('stand', true);
            }
            else if (this.pos == 'L') {
                this.ps.anims.play('standL', true);
            }
        } else {
            this.jump()
            this.healthBar.updateLocation(this.ps.x - 35, this.ps.y - 70)
        }

    }

    standShot() {
        this.ps.body.setSize(262, 690)
        this.ps.setVelocityX(0);

        if (this.ps.body.onFloor()) {
            this.isNotJumping = true
            this.healthBar.updateLocation(this.ps.x - 40, this.ps.y - 100)
            if (this.pos == 'R') {
                this.ps.anims.play('stand', true);
            }
            else if (this.pos == 'L') {
                this.ps.anims.play('standL', true);
            }
        } else {
            this.jump()
            this.healthBar.updateLocation(this.ps.x - 35, this.ps.y - 70)
        }

    }
}