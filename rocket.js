var rocketY = this.y

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

 hits(alien){
    //dist() functie meet afstand tussen 2 punten
    var d = dist(this.x, this.y, alien.x, alien.y);
    if (d < this.r + alien.radius){  // als ze elkaar raken
     return true;
    } 
    else{
      return false;
    }      
  }
 hits(meteor){
   //dist() functie meet afstand tussen 2 punten
   var d = dist(this.x, this.y, meteor.x, meteor.y);
   if (d < this.r + meteor.radius){  // als ze elkaar raken
   return true;
  } 
  else{
    return false;
  }      
}

  remove(){
    this.toDelete = true;
  }
}