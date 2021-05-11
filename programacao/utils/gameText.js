class GameText {
    constructor(scene, x, y, msg, size, fill, family) {
        this.text = scene.add.text(x, y, msg, { fontSize: size, fill: fill, fontFamily: 'Joystix' })
    }
    setNewText(x) {
        this.text.setText(x)
    }
}

