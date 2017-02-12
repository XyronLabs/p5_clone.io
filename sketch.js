var player;

var blobs = [];

function setup() {
    createCanvas(800, 480);

    player = new Player();

    for (i = 0; i < 10; i++)
        blobs.push(new Blob());
}

function draw() {
    background(0);
    translate(width / 2 - player.pos.x, height / 2 - player.pos.y);

    player.update();

    for (i = 0; i < 10; i++)
        blobs[i].show();

    player.show();
}