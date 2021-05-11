class MenuScreen extends Phaser.Scene {

    constructor(config) {
        config = {
            key: 'pause',
        }
        super(config);
    }

    preload() {
        this.load.image('background', '../res/cenario/menuPhoto.png')
        this.title = new GameText(this, 80, 20, 'ETE BUSTERS', '120px', '#FFFFFF', 'Georgia, "Goudy Bookletter 1911", Times, serif')
    }

    create(data) {
        this.add.image(1252 / 2, 834 / 2, 'background')

        const play = this.add.text(550, 680, 'PLAY!', { fontSize: '40px', fill: '#FFFFFF', fontFamily: 'Joystix' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start("scene1", {
                "players": "one"
            }));


        const localMultiplayer = this.add.text(350, 750, 'LOCAL MULTIPLAYER', { fontSize: '40px', fill: '#FFFFFF', fontFamily: 'Joystix' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start("scene1", {
                "players": "two"
            }));
    }

    update(time, delta) { }
}