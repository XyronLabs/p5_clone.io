var record = 0;
var dead = true;

var player;
var blobs;
var points;
var zoom;
var level;
var massCounter;
var massPerLevel;

// function preload() {
//     loadJSON(recordUrl, (r) => { record = r.feed.entry[0].gsx$record.$t });
// }

function setup() {
    createCanvas(800, 480);
    colorMode(HSB, 255, 255);
    background(20);

    showMenu(100);
}

function draw() {
    if (dead) {
        showMenu(100);
    } else {
        gameLoop();
    }
}

function mousePressed() {
    if (mouseX > width / 3 && mouseX < width * 2 / 3
     && mouseY > height / 3 && mouseY < height * 2 / 3) {
        dead = false;
        startGame();
    }
}