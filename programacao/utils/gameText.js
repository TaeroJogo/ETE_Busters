class GameText {
    constructor(scene, x, y, msg) {

        this.text = scene.add.text(x,y, msg, {fontSize: '32px', fill: '#000080', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'})
    }
    text(x) {
        this.text.setText(x)
    }
}

