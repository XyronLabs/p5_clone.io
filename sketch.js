var player;

function setup() {
    createCanvas(800, 480);

    player = new Player();
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    player.show();
}