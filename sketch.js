var mapSize = 4;
var minZoom = 0.12;

var player;

var blobs = [];

var points = 0;
var zoom = 1;
var dead = false;

function setup() {
    createCanvas(800, 480);

    player = new Blob(0, 0, 60);

    for (i = 0; i < 100; i++)
        blobs.push(new Blob(random(-width * mapSize, width * mapSize), random(-height * mapSize, height * mapSize), random(5, player.radius * 0.8)));

    colorMode(HSB, 255, 255);
}

function draw() {
    background(10);

    // Create new blobs randomly
    if (random() > 0.97) {
        var x = random(-width * mapSize, width * mapSize);
        var y = random(-height * mapSize, height * mapSize);
        var r = random(5, frameCount / (player.radius * 0.075));
        blobs.push(new Blob(x, y, r));
    }

    player.update();

    // Render the map
    push();
    translate(width / 2, height / 2);

    // Zoom out the map
    if (zoom > minZoom)
        zoom = lerp(zoom, 60 / player.radius, 0.1);
    scale(zoom);

    translate(-player.pos.x, -player.pos.y);

    // Draw blobs
    noStroke();
    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].moveRandom();
        blobs[i].show();

        // Blobs can eat other blobs
        for (var j = blobs.length - 1; j >= 0; j--) {
            if (blobs[i] !== blobs[j] && blobs[j].collided(blobs[i])) {
                var newArea = (PI * blobs[j].radius * blobs[j].radius) + (PI * blobs[i].radius * blobs[i].radius);
                blobs[i].radius = sqrt(newArea / PI);

                blobs.splice(j, 1);
            }
        }

        // Check if blob has been eaten
        if (player.collided(blobs[i])) {
            if (player.radius > blobs[i].radius) {
                var newArea = (PI * player.radius * player.radius) + (PI * blobs[i].radius * blobs[i].radius);
                player.radius = sqrt(newArea / PI);
                points += blobs[i].radius;

                blobs.splice(i, 1);
            } else {
                dead = true;
            }
        }
    }

    // Draw border
    noFill();
    strokeWeight(10);
    stroke(50);
    rect(-width * mapSize, -height * mapSize, width * 2 * mapSize, height * 2 * mapSize);

    // Draw player
    noStroke();
    player.show();
    pop();

    // Show points!
    fill(255);
    textSize(24);
    text('Points: ' + floor(points), 10, 35);

    // Finish the game if player is dead
    if (dead) {
        fill(255);
        textSize(100);
        text("Game over!", width/6, height/2);
        noLoop();
    }
}
