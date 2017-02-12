var player;

var blobs = [];

function setup() {
    createCanvas(800, 480);

    player = new Blob(0, 0, 20);

    for (i = 0; i < 100; i++)
        blobs.push(new Blob(random(width), random(height), random(5, 10)));

    colorMode(HSB);
}

function draw() {
    background(0);
    translate(width / 2 - player.pos.x, height / 2 - player.pos.y);

    player.update();

    for (i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (player.collided(blobs[i])) {
            player.radius += 1;
            blobs.splice(i, 1);
        }
    }

    player.show();
}