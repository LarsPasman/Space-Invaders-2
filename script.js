//Speler 
var p1X = 320;
var p1Y = 600;
var p1Width = 50;
var p1Height = 70;
var p1Speed = 7;

//Aliens
//Row 1
var a1x = 50;
var a1y = 150;
var a1w = 40;
var a1h = 30;

//Raketten
var r1x = p1X;
var r1y = p1Y; //raket begint waar speler is 
var rwidth = 10;
var rheight = 10;
var rspeed = 8;
var fire = false ;
var r1position = 0; //bijhouden waar de raket is

//counters
var lives = 3;
var score = 0;


function setup() {
  var cnv = createCanvas(640,640);
  cnv.style('display', 'block');

  rectMode(CENTER);
  imageMode(CENTER);
}

var width = 640;
var height = 640;

function draw(){
  
  keyPressed();
  keyTyped();
  
  background(0); 
  
  //omranding en banner maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
 
  //draw player
  fill(0,0,225)
  image(playerImage,p1X,p1Y,p1Width,p1Height,);

  //draw Alien
  fill(255)
  image(alienImage,a1x,a1y,a1w,a1h);

  //run rockets
  rockets();

  drawUI();

  botsingen();
}

//De speler UI tekenen (score en levens)
function drawUI(){
 fill(255,255,255);
 stroke(30,150,30);
 strokeWeight(5);
 textSize(30)
 textAlign(LEFT);
 text("SCORE: " + score ,28 ,45);
 textAlign(RIGHT);
 text("LIVES: " + lives ,620 ,45);
}

function rockets(){
// rocket position om max raketten in te stellen
  //position = 0 betekent raket is gereed om te schieten
  //position = 1 betekent raket is in de lucht ( )
  //position = 2 betekent raket heeft iets geraakt en komt terug

//raket tekenen
  fill(26,175,255);
  ellipse(r1x, r1y, rwidth, rheight);

//raket afvuren en bijhouden
  if (fire == true && r1position == 0){
    r1position = 1;
  }

  if (r1position == 1){
  r1x = r1x; //stoppen met player volgen
  r1y = r1y - rspeed; //omhoog bewegen 

  //als raket uit window gaat of mist
  if (r1y <=0){
    r1position = 2; // terug naar speler
  }  
}
  else{ // wanneer er niet word geschoten is de raket bij de speler
   r1y = p1Y;
   r1x = p1X;
 }
  if(r1position == 2){
   r1y = p1Y;
   r1x = p1X;
   r1position = 0;
  }  
}

//player input
function keyPressed(){
 if (keyCode == LEFT_ARROW && keyIsPressed){
  p1X -= p1Speed;
//  r1x -= p1Speed;
}
 else  if (keyCode == RIGHT_ARROW && keyIsPressed){
  p1X += p1Speed;  
//  r1x += p1Speed;
}

  
//Player kan niet door de Linker muur heen
  if (p1X - p1Width/2 < 0 ){
    p1X = p1Width/2;
  }
//Player kan niet door de rechter muur heen
  else if (p1X + p1Width/2 > width){
    p1X = width - p1Width/2
  }
}

function keyTyped(){
 if (key == " " && keyIsPressed && r1position == 0){
   fire = true; //rocket word afgevuurd bij spacebar
   fireSound.play()
 }
  else {
   fire = false;
 }
}   

function botsingen(){
  //botsingen raket en alien
  if(r1x >= a1x - a1w/2 && r1x <= a1x + a1w/2 && r1y >= a1y - a1h/2 && r1y <= a1y + a1h/2 ){

  explosionSound.play(); 
  a1x = -1000; // stuur de alien ver buiten het scherm
  r1position = 2; // raket terug naar speler    
  score = score + 1; // punten toevoegen
  }
}

function preload () {
//images
 bg = loadImage('sterren.png');
 playerImage = loadImage('player.png');
 alienImage = loadImage('alien.png');
//fonts
 //titleFont;
 //bodyFont;
//sounds
 fireSound = loadSound('pew.m4a');
 explosionSound = loadSound('explosion.m4a');
 backgroundMusic = loadSound('backgroundMusic.mp3');
}