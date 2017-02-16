var record = -1;
var player;
var blobs = [];

var points = 0;
var zoom = 1;
var level = 1;
var massCounter = 0;
var massPerLevel = 200;
var dead = false;

function preload() {
    //loadJSON(recordUrl, (r) => { record = r.feed.entry[0].gsx$record.$t });
}

function setup() {
    createCanvas(800, 480);

    startGame();
}

function draw() {
    gameLoop();
}
