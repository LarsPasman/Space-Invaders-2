class Laser {
  constructor(x, y,) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.diam = this.r * 2;
    this.toDelete = false;
  }

  move() {
    this.y = this.y + 6;
    
    if (lives <= 0){
      gameState = 3
      loseSound.play();
      lives = 1;
    }
  }

  show() {
    noStroke();
    fill(255, 50, 50);
    ellipse(this.x, this.y, this.diam, this.diam);
  }
  
  hitShip(){
    // als lasers ship hitten
    if (this.x >= ship.x - ship.width / 2 && this.x <= ship.x + ship.width / 2 &&
      this.y >= ship.y - ship.height / 2 && this.y <= ship.y + ship.height) {
      let idx = lasers.indexOf(this);
      lasers.splice(idx, 1);
      lives = lives - 1;
      hitSound.play();
    }
    else {
      lives = lives;
    }
  }
  
  hit() {
    //hit border
    if(this.y >= windowHeight/2+320){
      let idx = lasers.indexOf(this);
      lasers.splice(idx,1);
    }    

    // als lasers meteoren hitten
    for (var i = 0; i < meteors.length; i++) {
      if (this.hits(meteors[i])) {
        let idx = lasers.indexOf(this);
        lasers.splice(idx, 1);
        meteors.splice(i, 1);
        rockSound.play();    
      }
    }//einde meteor loop
  }

  hits(meteor) {
    //dist() functie meet afstand tussen 2 punten
    var d = dist(this.x, this.y, meteor.x, meteor.y);
    if (d < this.r + meteor.radius) {  // als ze elkaar raken
      return true;
    }
    else {
      return false;
    }
  }
}