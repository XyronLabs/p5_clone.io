function showMenu(bgCol) {
    push();
    
    fill(bgCol);
    rect(width/3, height/3, width/3, height/3);
    
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("START", width/2, height/2);

    pop();
}