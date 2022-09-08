 //Speler 
var p1X = 320;
var p1Y = 600;
var p1Width = 50;
var p1Height = 70;
var p1Speed = 7;

//Aliens
var a1w = 40;
var a1h = 30;

var row = 1;
var currentRow = row;
var rowDistance = 10; // hoe ver omlaag per tic
var aDistance = 0; // hoeveel omlaag
var aSpeed = 1; 
var aDirection = 1;


let aliens = []; // class aliens

//Raketten
var r1x = p1X;
var r1y = p1Y; //raket begint waar speler is 
var rwidth = 10;
var rheight = 10;
var rspeed = 16;
var fire = false ;
var r1position = 0; //bijhouden waar de raket is


//Meteors
var m1x = 100; // m1 = meteor 1 
var m1y = 500;
var m1Size = 60;

var m2x = 320;// m2 = meteor 2
var m2y = 480;
var m2Size = 60;

var m3x = 540;// m3 = meteor 3
var m3y = 490;
var m3Size = 70;


//counters
var time = 0;
var lives = 3;
var score = 0;

//gameState
var gameState = 0;
//gamestate 0 = welkom scherm
//gamestate 1 = de echte game
//gamestate 2 = win scherm
//gamestate 3 = lose scherm

var width = 640;
var height = 640;



function setup() {
  var cnv = createCanvas(640,640);
  cnv.style('display', 'block');

  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);

//background muziek spelen
 backgroundMusic.play();

  //onderste rij aliens
  startX = 91;
  startY = 190;
  for (var i = 0; i < 6; i++)
    aliens[i] = new Alien(i * startX + 91 , startY, alien1a, alien1b, 5)
//bovenste rij
  startY = 150;
  let offset = 0;
  for (var j=6; j<12; j++){
    aliens[j] = new Alien(offset * startX + 91 , startY, alien2a, alien2b, 10);
    offset++;
  }
}//close setup

function draw(){

  if (gameState == 0){
   welkom();
  }  
  
  if (gameState == 1){
   game();  
  }
  
  if (gameState == 2){
    win();
  }
  
  //lose
  if (gameState == 3){
    lose();
  }
}

function welkom(){
 background(0); 
  
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();  

  //woorden voor welkom scherm
  fill(0,255,0);
  textSize(40);
  textFont(bubbleFont);
  text('RUIMTE INDRINGERS', width/2 , 100 )
  textSize(13);
  textFont(pixelFont);
  text('GEMAAKT DOOR LARS PASMAN EN FRISO VAN NOORT',width/2, 130);

  textSize(40);
  textFont(bubbleFont);
  text('HOW TO PLAY:', width/2 , 250)
  textSize(10);
  textFont(pixelFont);
  text('GEBRUIK DE RECHTER EN LINKER PIJLEN OP HET TOETSENBORD OM TE BEWEGEN,',width/2, 290);
  text('DRUK OP DE SPATIEBALK OM RAKETTEN AF TE VUREN',width/2, 320);
  text('VERNIETIG ALLE ALIENS OM TE WINNEN',width/2, 380);

  textSize(19);
  textFont(bubbleFont);
  text('DRUK OP ENTER OM TE BEGINNEN',width/2, 450);

  image(alienImage,190,540,100,75)
  image(playerImage,450,540,75,100)

    if (keyCode == 13){
    gameState = 1;
    startSound.play();
  }
}// close welkom

function win(){
 background(0,255,0); 
  
  textAlign(CENTER);
  fill(0);
  textSize(60);
  textFont(bubbleFont);
  text('VICTORY', width/2 , 200 )
  textSize(15);
  textFont(pixelFont);
  text('REFRESH DE SITE OM OPNIEUW TE SPELEN!',width/2, 250);

  stroke(0);
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();

}//close win

function lose(){
 background(255,0,0); 
  
  textAlign(CENTER);
  fill(0);
  textSize(60);
  textFont(bubbleFont);
  text('GAME OVER', width/2 , 200 )
  textSize(15);
  textFont(pixelFont);
  text('REFRESH DE SITE OM OPNIEUW TE PROBEREN!',width/2, 250);

  stroke(0);
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
  
  if (keyCode == 71){
    gameState = 0; 
    game();
  }
}//close lose

function game(){
  
  keyPressed();
  keyTyped();
  
  background(0); 
  
// aliens
  for(var i = 0; i <aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
  }
  
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
  
  rockets();
  
  //draw player
  fill(0,0,225)
  image(playerImage,p1X,p1Y,p1Width,p1Height,);

  //run rockets
 
  drawUI();

  //run meteors
  Meteors();

  if (score >= 10){
    gameState = 2;
    winSound.play();
  }
}//close game


function Meteors(){
  // Meteor 1
 image(meteor, m1x,m1y, m1Size,m1Size);
 if(r1x >= m1x - m1Size/2 && r1x <= m1x + m1Size/2 && r1y >= m1y - m1Size/2 && r1y <= m1y + m1Size/2 ){
 
   if (m1Size >= 30){
    m1Size = m1Size-10;   
    r1position = 2;
  }
   else{
     m1x = -1000;
     r1position = 2;
  }//sluit else
 } 
// Meteor 2 
 image(meteor, m2x,m2y, m2Size, m2Size);
 if(r1x >= m2x - m2Size/2 && r1x <= m2x + m2Size/2 && r1y >= m2y - m2Size/2 && r1y <= m2y + m2Size/2 ){
 
   if (m2Size >= 30){
    m2Size = m2Size-10;   
    r1position = 2;
  }
   else{
     m2x = -1000;
     r1position = 2;
  }
 } 
// Meteor 3
 image(meteor, m3x,m3y, m3Size,m3Size);
 if(r1x >= m3x - m3Size/2 && r1x <= m3x + m3Size/2 && r1y >= m3y - m3Size/2 && r1y <= m3y + m3Size/2 ){
 
   if (m3Size >= 30){
    m3Size = m3Size-10;   
    r1position = 2;
  }
   else{
     m3x = -1000;
     r1position = 2;
  }
 }  
}//sluit meteors

//De speler UI tekenen (score en levens)
function drawUI(){
 fill(255,255,255);
 stroke(30,150,30);
 strokeWeight(5);
 textSize(30);
 textAlign(LEFT);
 text("SCORE: " + score ,28 ,45);
 textAlign(RIGHT);
 text("LIVES: " + lives ,620 ,45);
 stroke(0,64,255);
 strokeWeight(3);
 textSize(22);
 textAlign(CENTER);
 text("time: " + time + "s", 330, 45);

 if (frameCount % 60 === 0 ){
   time = time + 1
 }
}// close drawUI

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
 if (key == " " && keyIsPressed && r1position == 0 && gameState == 1){
   fire = true; //rocket word afgevuurd bij spacebar
   fireSound.play()
 }
  else {
   fire = false;
 }
}   

function preload () {
//images
 bg = loadImage('img/sterren.png');
 playerImage = loadImage('img/player.png');
 alienImage = loadImage('img/alien.png');
 meteor = loadImage('img/rock.png');

//aliens
 alien1a = loadImage('img/alien1a.png')
 alien1b = loadImage('img/alien1b.png')
 alien2a = loadImage('img/alien2a.png')
 alien2b = loadImage('img/alien2b.png')
// explosionGif = loadImage("explosion.gif");
// gif = createImg("explosion.gif");
//fonts
 bubbleFont = loadFont('fonts/bubbleFont.ttf');
 pixelFont = loadFont('fonts/pixelFont.ttf');
//sounds
 fireSound = loadSound('music/pew.m4a');
 explosionSound = loadSound('music/explosion.m4a');
 backgroundMusic = loadSound('music/8bit_song.mp3');
 startSound = loadSound('music/8bit_charge.m4a');
 winSound = loadSound('music/8bit_win.m4a');
}