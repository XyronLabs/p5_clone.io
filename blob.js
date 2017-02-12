function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = r;
    this.color = random(255);

    this.show = function() {
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    // Only used in player
    this.update = function() {
            var acc = createVector(mouseX - width / 2, mouseY - height / 2);
            acc.setMag(3);
            this.vel.lerp(acc, 0.2);
        if (this.pos.x + this.vel.x > -width * mapSize && this.pos.x + this.vel.x < width * mapSize) {
            this.pos.x += this.vel.x;
        }
        if (this.pos.y + this.vel.y > -height * mapSize && this.pos.y + this.vel.y < height * mapSize) {
            this.pos.y += this.vel.y;
        }
    }

    this.collided = function(p) {
        return p5.Vector.dist(this.pos, p.pos) < this.radius + p.radius;
    }

    this.show = function() {
        fill(this.color, 255, 255);
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }
}