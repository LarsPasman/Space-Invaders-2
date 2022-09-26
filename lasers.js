class Laser {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.diam = this.r * 2;
    this.toDelete = false;
  }

  move() {
    this.y = this.y + 4;
  }

  show() {
    noStroke();
    fill(255, 50, 50);
    ellipse(this.x, this.y, this.diam, this.diam);
  }

  hit() {

    if (this.x >= ship.x - ship.width/2 && this.x <= ship.x + ship.width/2 &&
      this.y >= ship.y - ship.height/2 && this.y <= ship.y + ship.height) {
      let idx = lasers.indexOf(this);      
      lasers.splice(1,idx);
      lives = lives - 1;
      
    }
    else{
      lives = lives;
    }
    
    if(lives == 0){
      gameState = 3
    }
  }
}
