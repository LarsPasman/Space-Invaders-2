//Speler 
var p1X = 300;
var p1Y = 475;
var p1Width = 50;
var p1Height = 30;
var p1Speed = 3;

//Aliens
//Row 1
var a1x = 50;
var a1y = 150;
var a1w = 40;
var a1h = 40;


function setup() {
  var cnv = createCanvas(600, 500);
  cnv.style('display', 'block');

  rectMode(CENTER);
}


function draw(){
  background(0); //zwart
  
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
  fill(0,255,0); //groen
  rect(width/2, 25, width, 50); // banner

  //draw player
  fill(25,25,175)
  rect(p1X, p1Y - 15, -15, 15,);
  fill(0,0,225)
  rect(p1X,p1Y,p1Width,p1Height,30);

  //draw Alien
  fill(255)
  rect(a1x,a1y,a1w,a1h);
  playerInput();
  }

//player input
function playerInput(){
 if (keyIsDown (LEFT_ARROW)){
  p1X -= p1Speed;  
}
 else if (keyIsDown(RIGHT_ARROW)){
  p1X += p1Speed;    
  }
  
//Player kan niet door de Linker muur heen
  if (p1X - p1Width/2 < 0 ){
    p1X = p1Width/2;
  }
//Player kan niet door de rechter muur heen
  else if (p1X + p1Width/2 > width){
    p1Width = width - p1Width/2
  }
}

