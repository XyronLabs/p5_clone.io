var mapSize = 2;
var minZoom = 0.15;

var player;

var blobs = [];

var points = 0;
var zoom = 1;

function setup() {
    createCanvas(800, 480);

    player = new Blob(0, 0, 60);

    for (i = 0; i < 100; i++)
        blobs.push(new Blob(random(-width * mapSize, width * mapSize), random(-height * mapSize, height * mapSize), random(5, 100)));

    colorMode(HSB);
}

function draw() {
    background(10);
    
    if (random() > 0.97) {
        blobs.push(new Blob(random(-width * mapSize, width * mapSize), random(-height * mapSize, height * mapSize), random(5, 10)));
    }

    player.update();
    push();

    translate(width / 2, height / 2);
    if (zoom > minZoom) {
        zoom = lerp(zoom, 60 / player.radius, 0.1);
    }
    scale(zoom);
    
    translate(- player.pos.x, - player.pos.y);

    noStroke();
    for (i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (player.collided(blobs[i])) {
            var newArea = (PI * player.radius * player.radius) + (PI * blobs[i].radius * blobs[i].radius);
            player.radius = sqrt(newArea / PI);
            points += blobs[i].radius;

            blobs.splice(i, 1);
        }
    }

    // Draw border
    noFill();
    strokeWeight(10);
    stroke(50);
    rect(-width * mapSize, -height * mapSize, width * 2 * mapSize, height * 2 * mapSize);

    noStroke();
    player.show();
    pop();

    fill(255);
    textSize(24);
    text('Points: ' + floor(points), 10, 35);
}