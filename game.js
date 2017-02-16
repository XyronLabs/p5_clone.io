function startGame() {
    player = new Blob(0, 0, 60);

    for (i = 0; i < 100; i++)
        blobs.push(new Blob(random(-width * mapSize, width * mapSize), random(-height * mapSize, height * mapSize), random(5, player.radius * 0.8)));

    colorMode(HSB, 255, 255);
}

function gameLoop() {
    background(20);

    // Create new blobs randomly
    if (random() > 0.97) {
        var r = random(5, player.radius * level * difficulty);
        do {
            var x = random(-width * mapSize, width * mapSize);
            var y = random(-height * mapSize, height * mapSize);
        } while (dist(x, y, player.pos.x, player.pos.y) < r + player.radius);
        blobs.push(new Blob(x, y, r));
    }

    player.update();

    if (massCounter > massPerLevel) {
        level++;
        massCounter %= massPerLevel;
        massPerLevel += 50;
        difficulty *= 0.9;
    }

    // Render the map
    push();
    translate(width / 2, height / 2);

    // Zoom out the map
    if (zoom > minZoom)
        zoom = lerp(zoom, 60 / player.radius, 0.1);
    scale(zoom);

    translate(-player.pos.x, -player.pos.y);

    // Draw map grid
    noFill()
    stroke(10);
    strokeWeight(1);
    for (var x = -width * mapSize; x < width * mapSize; x += gridSize)
        line(x, -height * mapSize, x, height * mapSize);
    
    for (var y = -height * mapSize; y < height * mapSize; y += gridSize) 
        line(-width * mapSize, y, width * mapSize, y);
    

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
                massCounter += blobs[i].radius;

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

    // Show points
    fill(255);
    textSize(20);
    text('Points: ' + floor(points), 10, 30);

    // Show level
    text('Level: ' + level, 10, 60);

    // Show mass until next level
    text('Remaining mass: ' + floor(massPerLevel - massCounter), 10, 90);

    // Show record (WIP)
    //text('Record: ' + record, 10, height - 10);

    // Finish the game if player is dead
    if (dead) {
        fill(255);
        textSize(100);
        text("Game over!", width/6, height/2);
        noLoop();
    }
}