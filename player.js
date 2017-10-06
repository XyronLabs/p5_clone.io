class Player extends Blob {
    constructor(x, y, r){
        super(x, y, r);
    }
}
// Only used in player
Player.prototype.update = function() {
    this.move(mouseX, mouseY);
}