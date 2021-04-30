class Bullet {
    constructor(scene, x, y, texture, scale) {
        this.x = x
        this.y = y
        this.bullet = scene.physics.add.sprite(x, y, texture).setScale(scale)
        this.xSpeed = 600;
        this.bullet.setGravityY(-200)
        this.bullet.setCollideWorldBounds(false);
    }

    fire(pos) {
        this.bullet.setVelocityX(pos == 'R' ? this.xSpeed : -this.xSpeed);
    }
}