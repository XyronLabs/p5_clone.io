function Blob() {
    this.pos = createVector(random(width), random(height));
    this.radius = 5;

    this.show = function() {
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    
}