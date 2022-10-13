class Ufo{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 35;
    this.alive = true;
    this.currentImg = 'A';
    this.pts = 25;
    this.xdir = 3;  //speed
  }

  show(){
      image(mysteryUFO,this.x,this.y,this.w,this.h);
    }
  
  move(){
    this.x += this.xdir; 
    
 //als hij de rand raakt
   if(this.x + this.w/2>= windowWidth/2 + 320){
     this.y = windowHeight + 100;
  }
 }
}
