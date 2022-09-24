class Meteor{
  constructor(x,y,img){
   this.x = x;
   this.y = y;
   this.width = 50;
   this.height = 50;    
   this.alive = true;
   this.img = img
   this.radius = 20; // voor botsingen
 }

  show(){
  if (this.alive){
    image(this.img,this.x,this.y,this.width,this.height)
  }
 }
}