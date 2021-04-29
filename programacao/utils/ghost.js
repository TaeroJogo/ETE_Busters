class Ghost {
    constructor(scene, x, y, texture, scale, gravity) {
        this.gs = scene.physics.add.sprite(x, y, texture).setScale(scale)
        this.gs.setGravityY(gravity)
        this.gs.setCollideWorldBounds(false);

        this.speed = 300;
    }
}