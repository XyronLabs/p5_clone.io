function Player() {
    this.pos = createVector(0, 0);
    this.radius = 10;

    this.show = function() {
        ellipse(0, 0, this.radius * 2, this.radius * 2);
    }
}