

function setup() {
  var cnv = createCanvas(windowWidth - 15, windowHeight - 20);
  cnv.style('display', 'block');

  rectMode(CENTER);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0);

  stroke(0,255,0);
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
  fill(0,255,0);
  rect(width/2, 25, width, 50);
  }
