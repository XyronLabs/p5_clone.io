let record = 0;
let dead = true;

let player;
let blobs;
let points;
let zoom;
let level;
let massCounter;
let massPerLevel;

// function preload() {
//     loadJSON(recordUrl, (r) => { record = r.feed.entry[0].gsx$record.$t });
// }

function setup() {
    createCanvas(windowWidth, windowHeight);
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
     && mouseY > height / 3 && mouseY < height * 2 / 3
     && dead) {
        dead = false;
        startGame();
    }
}