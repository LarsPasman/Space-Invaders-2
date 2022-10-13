class Alien{
  constructor(x, y, imgA, imgB, pointValue){
    this.x = x;
    this.y = y;
    this.w = 38;
    this.h = 26;
    this.alive = true;
    this.imgA = imgA;
    this.imgB = imgB;
    this.currentImg = 'A';
    this.pts = pointValue;
    this.radius = 20; // voor botsingen
    this.xdir = 2  //speed 
    this.r = floor(random(0 , 1000))
  }
 
  show(){
     //images
    if (this.alive){ // teken alleen als hij leeft
      if (this.currentImg === 'A') {
        image(this.imgA,this.x,this.y,this.w,this.h)
      }
      if (this.currentImg === 'B') {
        image(this.imgB,this.x,this.y,this.w,this.h)
      }      
    }

    //random schieten
    if(frameCount % this.r == 0){
      this.shoot();
      laserSound.play();
      this.r = floor(random(0,700))
    }

    //als de aliens bij schip komen
    if (this.y >= ship.y - ship.height){
     gameState = 3;
    loseSound.play();
    }
  }

  move(){
    this.x = this.x + this.xdir;

    //als hij de border hit verander richting en omlaag
   if(this.x + this.w/2 >= windowWidth/2 + 320 | this.x - this.w/2 <= windowWidth/2 -
  320 ){
     this.xdir = this.xdir * -1
     this.y = this.y + this.h + 50
   }

    //image animatie
    if (this.currentImg === 'A' && frameCount % 10 == 0 ){
      this.currentImg = 'B';
    }
   else if (this.currentImg === 'B' && frameCount % 10 == 0 ){
      this.currentImg ='A'
    }
  }

  shoot(){
    lasers.push(new Laser(this.x, this.y))
  }
}// close class