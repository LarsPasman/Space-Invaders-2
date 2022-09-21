
let aliens = []; // lijstje aliens
let ship;
let rockets = []; // lijstje raketten
let meteors = [];//lijstje meteoren

var rposition = 0; //bijhouden waar de raket is

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
 
  ship = new Ship();
  
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
  //meteorieten
  startX = 100;
  startY = 500;
  for (var i = 0; i < 3; i++){
    meteors[i] = new Meteor(i * startX + 220, startY, meteor);
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
  background(0); 
  
// aliens
  for(var i = 0; i <aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
  }

//meteors
    for(var i = 0; i <meteors.length; i++){
    meteors[i].show();
  }
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height);
  noStroke();

  //draw ship
  ship.show();
  ship.move();

  
  drawUI();  

  rockets.forEach(r1 => {
    //beweeg en laat rockets zien 
    r1.show();
    r1.move();
  
    //botsingen
    for (var j = 0; j < aliens.length; j++){
      if(r1.hits(aliens[j])){
        r1.remove();
        score = score + aliens[j].pts;
        explosionSound.play();
        aliens.splice(j,1); //verwijder alien van lijst
        rposition = 0;
      }
    }// einde alien loop
    for (var i = 0; i < meteors.length; i++){
      if(r1.hits(meteors[i])){
        r1.remove();
        meteors.splice(i,1);
      }
    }//einde meteor loop
  });
  
  //loop door rockets en verwijder
  for (var z = rockets.length -1; z>= 0; z--){
    if(rockets[z].toDelete){
      rockets.splice(z,1); // verwijder rocket van lijst
      rposition = 2;
    }
  }
  // einde rocket loop #2  
  //check of game over
  if (aliens.length <= 0){
    gameState = 2;
    winSound.play();   
  }  
  
  if (rposition == 2){
    rposition = 0;
  }
  
}//close game

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

//player input

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