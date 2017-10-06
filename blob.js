class Blob {
    constructor(x, y, r){
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.dir = createVector(random(0, width), random(0, height));
        this.radius = r;
        this.color = random(255);
    }
}

// Only used in player
Blob.prototype.update = function() {
    this.move(mouseX, mouseY);
}

Blob.prototype.moveRandom = function() {
    if (random() > 0.97)
        this.dir = createVector(random(0, width), random(0, height));
    this.move(this.dir.x, this.dir.y);
}

Blob.prototype.move = function(x, y) {
    var acc = createVector(x - width / 2, y - height / 2);
    acc.setMag(3);
    this.vel.lerp(acc, 0.2);
    if (this.pos.x + this.vel.x > -width * mapSize && this.pos.x + this.vel.x < width * mapSize)
        this.pos.x += this.vel.x;
    if (this.pos.y + this.vel.y > -height * mapSize && this.pos.y + this.vel.y < height * mapSize)
        this.pos.y += this.vel.y;
}

Blob.prototype.move = function(x, y) {
    var acc = createVector(x - width / 2, y - height / 2);
    acc.setMag(3);
    this.vel.lerp(acc, 0.2);
    if (this.pos.x + this.vel.x > -width * mapSize && this.pos.x + this.vel.x < width * mapSize)
        this.pos.x += this.vel.x;
    if (this.pos.y + this.vel.y > -height * mapSize && this.pos.y + this.vel.y < height * mapSize)
        this.pos.y += this.vel.y;
}

Blob.prototype.collided = function(p) {
    return p != null && p5.Vector.dist(this.pos, p.pos) < this.radius + p.radius;
}

Blob.prototype.show = function() {
    fill(this.color, 255, 255);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

    noFill();
    stroke(this.color, 255, 90);
    strokeWeight(this.radius / 15);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    
    fill(this.color, 255, 40);
    textSize(this.radius * 0.5);
    textAlign(CENTER, CENTER);
    text(floor(this.radius), this.pos.x, this.pos.y);
}