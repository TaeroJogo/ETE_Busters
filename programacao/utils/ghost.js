class Ghost {
    constructor(scene, x, y, texture, scale, gravity) {
        this.gs = scene.physics.add.sprite(x, y, texture).setScale(scale)//adiciona o corpo do fantasma
        this.gs.setGravityY(gravity)
        this.gs.setCollideWorldBounds(false);

        this.gs.isAlive = true//se fantasma esta vivo ou nao

        this.speed = 300;
    }
}