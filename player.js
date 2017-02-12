function Player() {
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.radius = 10;

    this.update = function() {
        var acc = createVector(mouseX - width / 2, mouseY - height / 2);
        acc.setMag(3);
        this.vel.lerp(acc, 0.2);
        this.pos.add(this.vel);
    }

    this.collided = function(p) {
        return p5.Vector.dist(this.pos, p.pos) < this.radius + p.radius;
    }

    this.show = function() {
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }
}