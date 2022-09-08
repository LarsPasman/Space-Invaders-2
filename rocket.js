class Rocket{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.r = 5; //radius
    this.diam = this.r * 2;//diameter
    this.toDelete = false;
  }

  show(){
    noStroke();
    fill(255,0,255);
    ellipse(this.x,this.y,this.diam,this.diam);
    
  }

  move(){
   this.y = this.y - 16;
  }
}