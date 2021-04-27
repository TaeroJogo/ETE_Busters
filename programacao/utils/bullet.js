let Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'id_card');

            this.speed = Phaser.Math.GetSpeed(600, -1);
        },

    fire: function (x, y, pos) {
        this.speed = pos == 'R' ? Phaser.Math.GetSpeed(600, 1) : Phaser.Math.GetSpeed(600, -1);

        this.setPosition(pos == 'R' ? x + 100 : x, y + 50);
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta) {
        this.x += this.speed * delta;

        if (this.x > 820) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});