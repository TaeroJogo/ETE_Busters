class Bullet {
    constructor(scene, x, y, texture, scale, audio) {
        this.x = x
        this.y = y
        this.bullet = scene.physics.add.sprite(x, y, texture).setScale(scale) //cria o corpo da carteirinha que se chama sprite
        this.xSpeed = 600;
        this.bullet.setGravityY(-350)//gravidade
        this.bullet.setCollideWorldBounds(false);//colisao com as bordas
        audio.play()
    }

    //ELE RECEBE O POS (POSICAO DO PLAYER) PARA VER SE CARTEIRINHA VAI PARA A DIREITA OU ESQUERDA

    fire(pos) {
        this.bullet.setVelocityX(pos == 'R' ? this.xSpeed : -this.xSpeed); //define a velocidade da carteirinha
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