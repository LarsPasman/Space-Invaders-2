//Speler 
var p1X = 300;
var p1Y = 475;
var p1Width = 50;
var p1Height = 30;
var p1Speed = 5;

//Aliens
//Row 1
var a1x = 50;
var a1y = 150;
var a1w = 40;
var a1h = 40;

//Raketten
var r1x = p1X;
var r1y = p1Y; //raket begint waar speler is 
var rwidth = 7;
var rheight = 20;
var rspeed = 5;
var fire = false ;
var r1position = 0; //bijhouden waar de raket is

function setup() {
  var cnv = createCanvas(600, 500);
  cnv.style('display', 'block');

  rectMode(CENTER);
}

var width = 600;
var height = 500;

function draw(){
  keyTyped();
  keyPressed();
  
  
  background(0); //zwart 
  
  //omranding en banner maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
  fill(0,255,0) //groen
  rect(width/2, 25, width, 50); // banner

  //draw player
  fill(25,25,175)
  rect(p1X, p1Y - 15, -15, 15,);
  fill(0,0,225)
  rect(p1X,p1Y,p1Width,p1Height,30);

  //draw Alien
  fill(255)
  rect(a1x,a1y,a1w,a1h);

  //run rockets
  rockets();
  fireRocket();
}

function rockets(){
// rocket position om max raketten in te stellen
  //position = 0 betekent raket is gereed om te schieten
  //position = 1 betekent raket is in de lucht ( )
  //position = 2 betekent raket heeft iets geraakt en komt terug

//raket tekenen
  fill(26,175,255);
  rect(r1x, r1y, rwidth, rheight);

//raket afvuren en bijhouden
  if (fire == true && r1position == 0){
    r1position = 1;
  }
}

function fireRocket(){
 if (r1position == 1){
  r1x = r1x; //stoppen met player volgen
  r1y = r1y - rspeed; //omhoog bewegen 

  //als raket uit window gaat of mist
   if (r1y <=0){
    r1position = 0; // terug naar speler
  }  
}
   
 else{ // wanneer er niet word geschoten is de raket bij de speler
  r1y = p1Y;
  r1x = p1X;
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
 if (key == " " && keyIsPressed){
   fire = true; //rocket word afgevuurd bij spacebar
 }
  else {
   fire = false;
 }
}   
