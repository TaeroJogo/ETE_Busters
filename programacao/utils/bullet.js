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
    fireDiagonally(pos) {
        this.bullet.angle = pos == 'R' ? 320 : 45
        this.bullet.setVelocityX(pos == 'R' ? this.xSpeed : -this.xSpeed);
        this.bullet.setVelocityY(-400);
    }
    fireUp() {
        this.bullet.angle = 90
        this.bullet.setVelocityY(-400);
    }
}