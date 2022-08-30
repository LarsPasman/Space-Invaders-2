 //Speler 
var p1X = 320;
var p1Y = 600;
var p1Width = 50;
var p1Height = 70;
var p1Speed = 7;

//Aliens

var a1w = 40;
var a1h = 30;

//Row 1
var a1x = 50;
var a1y = 150;
var a2x = 110;
var a2y = 150;
var a3x = 170;
var a3y = 150;
var a4x = 230;
var a4y = 150;
var a5x = 290;
var a5y = 150;
var a6x = 350;
var a6y = 150;
var a7x = 410;
var a7y = 150;
var a8x = 470;
var a8y = 150;
var a9x = 530;
var a9y = 150;
var a10x = 590;
var a10y = 150;


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
}

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
  if (gameState == 3){
    lose();
  }
  if (gameState == 0 && key == " " && keyIsPressed){
    gameState = 1;
    startSound.play();
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
  text('DRUK OP SPATIEBALK OM TE BEGINNEN',width/2, 450);
}

function win(){
 background(0,255,0); 
  
  textAlign(CENTER);
  fill(0);
  textSize(60);
  textFont(bubbleFont);
  text('VICTORY', width/2 , 200 )
  textSize(25);
  textFont(pixelFont);
  text('REFRESH TO PLAY AGAIN!',width/2, 250);

  stroke(0);
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
}

function lose(){
  background(0); 
  
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
}

function game(){
  
  keyPressed();
  keyTyped();
  
  background(0); 
  
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();
 
  //draw player
  fill(0,0,225)
  image(playerImage,p1X,p1Y,p1Width,p1Height,);

  //draw Alien
  Aliens();
  //run rockets
  rockets();

  drawUI();

  botsingen();

  if (score >= 10){
    gameState = 2;
    winSound.play();
  }
}//close game

function Aliens(){
  fill(255)
  image(alienImage,a1x,a1y,a1w,a1h);
  image(alienImage,a2x,a2y,a1w,a1h);
  image(alienImage,a3x,a3y,a1w,a1h);
  image(alienImage,a4x,a4y,a1w,a1h);
  image(alienImage,a5x,a5y,a1w,a1h);
  image(alienImage,a6x,a6y,a1w,a1h); 
  image(alienImage,a7x,a7y,a1w,a1h); 
  image(alienImage,a8x,a8y,a1w,a1h);
  image(alienImage,a9x,a9y,a1w,a1h);
  image(alienImage,a10x,a10y,a1w,a1h);

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
 if (key == " " && keyIsPressed && r1position == 0 && gameState == 1){
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
    
 // gif_loadImg.position(50, 350);
  explosionSound.play(); 
 
  a1y = -10000; // stuur de alien ver buiten het scherm
  r1position = 2; // raket terug naar speler    
  score = score + 1; // punten toevoegen
  }

  if(r1x >= a2x - a1w/2 && r1x <= a2x + a1w/2 && r1y >= a2y - a1h/2 && r1y <= a2y + a1h/2 ){
    
  explosionSound.play(); 
 
  a2y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a3x - a1w/2 && r1x <= a3x + a1w/2 && r1y >= a3y - a1h/2 && r1y <= a3y + a1h/2 ){
    
  explosionSound.play(); 
 
  a3y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a4x - a1w/2 && r1x <= a4x + a1w/2 && r1y >= a4y - a1h/2 && r1y <= a4y + a1h/2 ){
    
  explosionSound.play(); 
 
  a4y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a5x - a1w/2 && r1x <= a5x + a1w/2 && r1y >= a5y - a1h/2 && r1y <= a5y + a1h/2 ){
    
  explosionSound.play(); 
 
  a5y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a6x - a1w/2 && r1x <= a6x + a1w/2 && r1y >= a6y - a1h/2 && r1y <= a6y + a1h/2 ){
    
  explosionSound.play(); 
 
  a6y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a7x - a1w/2 && r1x <= a7x + a1w/2 && r1y >= a7y - a1h/2 && r1y <= a7y + a1h/2 ){
    
  explosionSound.play(); 
 
  a7y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a8x - a1w/2 && r1x <= a8x + a1w/2 && r1y >= a8y - a1h/2 && r1y <= a8y + a1h/2 ){
    
  explosionSound.play(); 
 
  a8y = -10000;
  r1position = 2;   
  score = score + 1;
  }

  if(r1x >= a9x - a1w/2 && r1x <= a9x + a1w/2 && r1y >= a9y - a1h/2 && r1y <= a9y + a1h/2 ){
    
  explosionSound.play(); 
 
  a9y = -10000;
  r1position = 2;   
  score = score + 1;
  } 

  if(r1x >= a10x - a1w/2 && r1x <= a10x + a1w/2 && r1y >= a10y - a1h/2 && r1y <= a10y + a1h/2 ){
    
  explosionSound.play(); 
 
  a10y = -10000;
  r1position = 2;   
  score = score + 1;
  }
}

function preload () {
//images
 bg = loadImage('sterren.png');
 playerImage = loadImage('player.png');
 alienImage = loadImage('alien.png');
// explosionGif = loadImage("explosion.gif");
 //gif_loadImg = createImage("explosion.gif");
//fonts
 bubbleFont = loadFont('bubbleFont.ttf');
 pixelFont = loadFont('pixelFont.ttf');
//sounds
 fireSound = loadSound('pew.m4a');
 explosionSound = loadSound('explosion.m4a');
 backgroundMusic = loadSound('8bit_song.mp3');
 startSound = loadSound('8bit_charge.m4a');
 winSound = loadSound('8bit_win.m4a');
}