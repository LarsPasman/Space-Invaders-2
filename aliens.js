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

  move(){
    this.x = this.x + this.xdir;
   if(this.x + this.w/2 >= 640 | this.x - this.w/2 <= 0){
     this.xdir = this.xdir * -1
     this.y = this.y + this.h * 2
   }

    if (this.currentImg === 'A' && frameCount % 10 == 0 ){
      this.currentImg = 'B';
    }
   else if (this.currentImg === 'B' && frameCount % 10 == 0 ){
      this.currentImg ='A'
    }
  }
}// close class