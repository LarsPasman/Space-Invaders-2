class Ship{
  constructor(){
   this.x = width/2
    this.y = height - 40 ; 
    this.width = 50
    this.height = 70;
    this.xdir = 0;
  }

  show(){
    image(playerImage, this.x, this.y, this.width, this.height)
  }
  move(){
    this.x += this.xdir * 10
  }
  setDir(dir){
    this.xdir = dir;
  }
}