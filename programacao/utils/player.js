class Player {
    constructor(scene, x, y, texture, scale, gravity) {
        this.ps = scene.physics.add.sprite(x, y, texture).setScale(scale)
        this.ps.setGravityY(gravity)
        this.ps.setCollideWorldBounds(true);

        this.pos = 'R'

        this.healthBar = new HealthBar(scene, x, y);
    }

    move_left() {
        this.ps.setVelocityX(-160);
        this.ps.anims.play('left', true);
        this.pos = 'L';
        this.healthBar.updateLocation(this.ps.x - 65, this.ps.y - 100)
    }

    move_right() {
        this.ps.setVelocityX(160);
        this.ps.anims.play('right', true);
        this.pos = 'R';
        this.healthBar.updateLocation(this.ps.x - 25, this.ps.y - 100)
    }

    jump() {
        this.ps.setVelocityY(-400);
        this.ps.setVelocityX(0);
        this.ps.anims.play('jump', true);
        this.healthBar.updateLocation(this.ps.x - 65, this.ps.y - 100)
    }

    sneak() {
        this.ps.setVelocityX(0);
        this.ps.anims.play('down', true);
        this.healthBar.updateLocation(this.ps.x - 40, this.ps.y - 50)
    }

    stand() {
        this.ps.setVelocityX(0);
        if (this.pos == 'R') {
            this.ps.anims.play('stand', true);
        }
        else if (this.pos == 'L') {
            this.ps.anims.play('standL', true);
        }
        this.healthBar.updateLocation(this.ps.x - 40, this.ps.y - 100)
    }
}