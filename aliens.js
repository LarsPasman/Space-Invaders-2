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
    this.xdir = 1;    
  }

  show(){
    if (this.alive == true){ // teken alleen als hij leeft
      if (this.currentImg === 'A') {
        image(this.imgA,this.x,this.y,this.w,this.h)
      }
      if (this.currentImg === 'B') {
        image(this.imgB,this.x,this.y,this.w,this.h)
      }      
    }
  }
}// close class