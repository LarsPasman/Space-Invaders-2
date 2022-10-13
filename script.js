 // lijstjes
let lasers = [];
let aliens = []; 
let ship;
let ufo;
let rockets = []; 
let meteors = [];
let boss;


//bijhouden hoeveel raketten je hebt
var rocketCount = 1; 

//voor muziekfix
var musicCounter = 0;
var bossCounter = 0;

var particleRandom = 20;
var randomCount = 500;

//counters
var timer = 0;
var timer2 = 10;
var lives = 3;
var bossLives = 20;
var score = 0;
var geschoten = 0;

//gameState
var gameState = 0;
//gamestate 0 = welkom scherm
//gamestate 1 = de echte game
//gamestate 2 = win scherm
//gamestate 3 = lose scherm
//gamestate 4 = boss welkom scherm
//gamestate 5 = bossfight

//de box size
width1=640;
height1=640;

function preload () {
//images
 playerImage = loadImage('img/player.png');
 heart = loadImage('img/heart.png');
 rock = loadImage('img/rock.png');
 bullet = loadImage('img/kogel.png');
 baas = loadImage('img/quandalePicture.png');
 quandaleHeart = loadImage('img/quandale heart.png');
  
//aliens
 alien1a = loadImage('img/alien1a.png');
 alien1b = loadImage('img/alien1b.png');
 alien2a = loadImage('img/alien2a.png');
 alien2b = loadImage('img/alien2b.png');
 mysteryUFO = loadImage('img/mystery.png')
  
 //fonts
 bubbleFont = loadFont('fonts/bubbleFont.ttf');
 pixelFont = loadFont('fonts/pixelFont.ttf');

 //sounds
 quandaleHit = loadSound('music/quandaleHit.mp3')
 quandaleDingle = loadSound('music/quandale dingle song.mp3')
 bossMusic = loadSound('music/boss.mp3')
 fireSound = loadSound('music/pew.m4a');
 laserSound = loadSound('music/laser.mp3')
 explosionSound = loadSound('music/explosion.m4a');
 backgroundMusic = loadSound('music/8bit_song.mp3');
 startSound = loadSound('music/8bit_charge.m4a');
 winSound = loadSound('music/8bit_win.m4a');
 hitSound = loadSound('music/hitSound.mp3')
 loseSound = loadSound('music/gameOver.wav');
 rockSound = loadSound('music/rockSound.mp3');
}//close preload

function setup() {
  //canvas vult hele scherm
  var cnv = createCanvas(windowWidth - 15,windowHeight -17);
  cnv.style('display', 'block');

  //background muziek spelen
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  
  ufo = new Ufo(windowWidth/2 - 295,windowHeight/2 - 230);
  
  ship = new Ship();
  boss = new Boss();
  
  
  //onderste rij aliens
  startX = 91;
  startY = windowHeight/2 - 130;
  for (var i = 0; i < 6; i++)
    aliens[i] = new Alien(i * startX + windowWidth/2 - 220 , startY, alien1a, alien1b, 5)
  
//bovenste rij aliens
  startY = windowHeight/2 - 170;
  let offset = 0;
  for (var j=6; j<12; j++){
    aliens[j] = new Alien(offset * startX + windowWidth/2 - 220, startY, alien2a, alien2b, 10);
    offset++;
  }
  
  //meteorieten
  startX = 120;
  startY = windowHeight/2 + 180;
  for (var i = 0; i < 5; i++){
    meteors[i] = new Meteor(i * startX + windowWidth/2 - 240, startY, rock);
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

  if (gameState == 3){
    lose();
  }
  if (gameState == 4){
    bossStart();
  }
  
  if (gameState == 5){
    bossFight();
  }
}

function game(){  
//om de muziekbug te fixen!!!!
  if(frameCount%1==0){
    musicCounter = musicCounter + 1
  }
  if(musicCounter == 10){
  backgroundMusic.loop();
}
  
  background(0); 

// aliens
  for(var i = 0; i <aliens.length; i++){
    aliens[i].show();
    aliens[i].move();

    if(geschoten == 1){
    aliens[i].xdir = aliens[i].xdir * 1.12
    }
  }
  geschoten = 0;

  // als aliens dood zijn ga naar volgende level
  if (aliens.length <= 0){
    gameState = 4;
    rocketCount = 1000;
    // winSound.play();   
  }

//meteors
    for(var i = 0; i <meteors.length; i++){
    meteors[i].show(); 
  }
  
  //draw ship
  ship.show();
  ship.move();
  
if(timer >= 10){
  ufo.move();
  ufo.show();
}
  
  drawUI();  
  
  //lasers
  lasers.forEach(l => {
    l.hit();
    l.hitShip();
    l.show();
    l.move();
  })

  //rockets
  rockets.forEach(r1 => {
    //beweeg en laat rockets zien 
    r1.show();
    r1.move();
    r1.hit();
  })
  
}//close game

//De speler UI tekenen voor de game (gameState 1)
function drawUI(){
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  
  
 fill(255,255,255);
 stroke(30,150,30);
 strokeWeight(5);
 textSize(30);
 textAlign(LEFT);
 text("SCORE: " + score ,windowWidth/2 - 292 ,windowHeight/2-275);

 stroke(0,64,255);
 strokeWeight(3);
 textSize(20);
 textAlign(CENTER);
 text("time: " + timer + "s", windowWidth/2 + 15, windowHeight/2-275);

 stroke(219,0,0);
 textAlign(RIGHT);
 textSize(20);
 text('x' + lives, windowWidth/2+190, windowHeight/2-275)
 image(heart,windowWidth/2+130 , windowHeight/2-282 , 40 , 40 );

 stroke(181, 139, 0);
 textAlign(RIGHT);
 textSize(20);
 text('x' + rocketCount, windowWidth/2+290, windowHeight/2-275)
 image(bullet ,windowWidth/2+225 , windowHeight/2-282 , 80 , 60 );
  
 if (frameCount % 60 == 0){
   timer = timer + 1
 }
}// close drawUI

//gameState 0 maken
function welkom(){ 
  backgroundMusic.stop();
  bossMusic.stop();
  
  background(0);
  //omranding maken
  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  

  stroke(0,255,0); //groen
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();
  
  //woorden voor welkom scherm
  fill(0,255,0);
  textSize(40);
  textFont(bubbleFont);
  text('RUIMTE INDRINGERS', windowWidth/2, windowHeight/2 - 220)
  textSize(13);
  textFont(pixelFont);
  text('GEMAAKT DOOR LARS PASMAN EN FRISO VAN NOORT',windowWidth/2, windowHeight/2 - 190);

  textSize(40);
  textFont(bubbleFont);
  text('HOW TO PLAY:',windowWidth/2, windowHeight/2- 70)
  textSize(10);
  textFont(pixelFont);
  text('GEBRUIK DE RECHTER EN LINKER PIJLEN OP HET TOETSENBORD OM TE BEWEGEN,',windowWidth/2, windowHeight/2 - 30);
  text('DRUK OP DE SPATIEBALK OM RAKETTEN AF TE VUREN',windowWidth/2, windowHeight/2);
  text('VERNIETIG ALLE ALIENS OM TE WINNEN',windowWidth/2, windowHeight/2 + 60);

  textSize(19);
  textFont(bubbleFont);
  text('DRUK OP ENTER OM TE BEGINNEN',windowWidth/2, windowHeight/2 + 130);

//images start
  image(playerImage,windowWidth/2+ 130, windowHeight/2+220,75,100)
  

//alien scores
  //alien 1
  image(alien1a, windowWidth/2 - 200, windowHeight/2+175,25,20);
  fill(0,255,255)
  textSize(13);
  text(' = 5 PUNTEN',windowWidth/2-120, windowHeight/2+180);
  //alien 2
  image(alien2a, windowWidth/2-200, windowHeight/2+225,25,20);
  fill(0,255,255)
  textSize(13);
  text(' = 10 PUNTEN',windowWidth/2-120, windowHeight/2+230);
  //mystery alien
  image(mysteryUFO, windowWidth/2-200, windowHeight/2+272,35,30);
  fill(0,255,255)
  textSize(13);
  text(' = ? PUNTEN',windowWidth/2-120, windowHeight/2+280);

// als speler enter klikt start de game
    if (keyCode == 13){
    musicCounter = 0;
    bossCounter = 0;
    gameState = 1;
    startSound.play();
  }
}// close welkom

//gameState 2 maken
function win(){
  bossMusic.stop();
  
 background(0,255,0); 
  
  textAlign(CENTER);
  fill(0);
  textSize(60);
  textFont(bubbleFont);
  text('VICTORY', windowWidth/2 , windowHeight/2-120  )
  
  textSize(13);
  textFont(pixelFont);
  text('JE TIJD WAS: ' + timer + 's' ,windowWidth/2, windowHeight/2-70);

  textSize(13);
  textFont(pixelFont);
  text('JE SCORE WAS: ' + score, windowWidth/2, windowHeight/2 - 35);
  
  textSize(19);
  textFont(bubbleFont);
  text('DRUK OP R OM OPNIEUW TE SPELEN!',windowWidth/2, windowHeight/2+30);

  
  //omranding maken
  stroke(0); //groen
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  


  if (keyCode == 82){
    Reset();
    gameState = 0; 
  }
}//close win

//gameState 3 maken
function lose(){
  bossMusic.stop();
  
  background(255,0,0); 
  
  textAlign(CENTER);
  fill(0);
  textSize(60);
  textFont(bubbleFont);
  text('GAME OVER', windowWidth/2 , windowHeight/2-120 )
  
  textSize(13);
  textFont(pixelFont);
  text('JE TIJD WAS: ' + timer + 's' ,windowWidth/2, windowHeight/2-70);

  textSize(13);
  textFont(pixelFont);
  text('JE SCORE WAS: ' + score ,windowWidth/2, windowHeight/2 - 35);
  
  textSize(19);
  textFont(bubbleFont);
  text('DRUK OP R OM OPNIEUW TE PROBEREN!',windowWidth/2, windowHeight/2+30); 
  
  stroke(0); //zwart
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  

  
  if (keyCode == 82){
    Reset();
    gameState = 0; 
    lasers = [];
  }
}//close lose

//gameState 4 maken
function bossStart(){ 
  backgroundMusic.stop();
   
//start muziek
  if(frameCount%1==0){
    bossCounter += 1
  }
  if(bossCounter == 10){
  quandaleDingle.loop();
}
  
  background(198, 142, 23);
  textAlign(CENTER);
  fill(0);
  textSize(40);
  textFont(bubbleFont);
  text('BEN JE KLAAR?!', windowWidth/2 , windowHeight/2-180  )
  
  textSize(14);
  textFont(pixelFont);
  text('VOOR HET GEVECHT VAN JE LEVEN.....' ,windowWidth/2, windowHeight/2-130);

  fill(255,0,0)
  textSize(22);
  textFont(bubbleFont);
  text('QUANDALE DINGLE PRINGLE MINGLE',windowWidth/2, windowHeight/2);

  fill(0)
  textSize(13);
  textFont(pixelFont);
  text('IS KLAAR OM TE VECHTEN!' ,windowWidth/2, windowHeight/2 + 50);

  textSize(12);
  textFont(pixelFont);
  text('MAAK QUANDALE DOOD VOORDAT DE TIJD VOORBIJ IS' ,windowWidth/2, windowHeight/2 + 140);

  textSize(19);
  textFont(bubbleFont);
  text('DRUK OP ENTER OM TE VECHTEN!' ,windowWidth/2, windowHeight/2 + 230);

  //omranding maken
  stroke(255,255,0); //geel
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  


  if (keyCode == 13){
    bossMusic.play();
    gameState = 5; 
    ship.x = windowWidth/2;
  }
}

//gameState 5 maken
function bossFight(){
  background(0)
  drawBossUI(); 
  rocketCount = 1000;
  quandaleDingle.stop();
  timer
  
  ship.show();
  ship.move();

  boss.show();
  boss.move();
  
  lasers.forEach(l1 => {
    l1.show();
    l1.move();
    l1.hitShip();
  });
  
  rockets.forEach(r1 => {
    //beweeg en laat rockets zien 
    r1.show();
    r1.move();
    r1.bossHit();
  }); 
  
   if (frameCount % 60 == 0){
   timer = timer + 1
 }
}//close bossFight

//De bossfight UI tekenen
function drawBossUI(){
  //omranding maken
  stroke(255,0,0); //rood
  noFill();
  strokeWeight(3);
  rect(windowWidth/2, windowHeight/2, width1, height1);
  noStroke();  

  
 fill(255,255,255);
 stroke(30,150,30);
 strokeWeight(5);
 textSize(30);
 textAlign(LEFT);
 text("SCORE: " + score ,windowWidth/2 - 292 ,windowHeight/2-275);

 stroke(0,64,255);
 strokeWeight(3);
 textSize(20);
 textAlign(CENTER);
 text("time left: " + timer2 + "s", windowWidth/2 + 15, windowHeight/2-250);

 stroke(219,0,0);
 textAlign(RIGHT);
 textSize(20);
 text('x' + lives, windowWidth/2+240, windowHeight/2-275)
 image(heart,windowWidth/2+180 , windowHeight/2-282 , 40 , 40 );

 stroke(181, 139, 0);
 textAlign(RIGHT);
 textSize(20);
 text(':' + Infinity, windowWidth/2 + 140, windowHeight/2-275)
 image(bullet ,windowWidth/2 - 5, windowHeight/2-285 , 80 , 60 );

 stroke(219,0,0);
 textAlign(CENTER);
 textSize(20);
 text('Quandale Lives:   x' + bossLives, windowWidth/2, windowHeight/2)
 image(quandaleHeart ,windowWidth/2 + 90, windowHeight/2 - 5, 40 , 33 );

 if (frameCount % 60 === 0 ){
   timer2 = timer2 - 1
 }

 if(timer2 <= 0){
   gameState = 2;
   winSound.play();
 }
}// close drawBossUI

function Reset(){
  lasers = [];
  rockets = [];
  timer = 0;
  timer2 = 20;
  score = 0;
  lives = 3;
  bossLives = 20;
  rocketCount = 1;
  randomCount = 500
  setup();
}

function windowResized() {
  resizeCanvas(windowWidth-15, windowHeight-17);
}