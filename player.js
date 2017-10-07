class Player extends Blob {
    constructor(x, y, r){
        super(x, y, r);
    }
    update() {
        this.move(mouseX, mouseY);
    }
}