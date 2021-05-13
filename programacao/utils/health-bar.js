class HealthBar {
    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);//cria barra de vida na cena

        this.x = x;
        this.y = y;
        this.value = 100;//quantidade de vida
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    updateLocation(x, y) {
        this.x = x
        this.y = y
        this.draw()
    }

    decrease(amount) {//diminui vida
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {//pinta ela, se vida estiver baixa muda a cor para vermelha
        this.bar.clear();

        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        let d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
}