class GameText {
    constructor(scene, x, y, msg, size, fill, family) {
        this.text = scene.add.text(x, y, msg, { fontSize: size, fill: fill, fontFamily: 'Joystix' })//adiciona um texto no jogo
    }
    setNewText(x) {
        this.text.setText(x)
    }
}

