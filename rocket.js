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

    
    if(this.y <= 0){
      let idx = rockets.indexOf(this);
      rockets.splice(idx,1);
    }    
  }

  move(){
   this.y = this.y - 16;

  }

  hit(){
     for (var j = 0; j < aliens.length; j++){
      if(this.hits(aliens[j])){
        this.remove();
        score = score + aliens[j].pts;
        explosionSound.play();
        aliens.splice(j,1); //verwijder alien van lijst
      }
    }// einde alien loop
    
    for (var i = 0; i < meteors.length; i++){
      if(this.hits(meteors[i])){
        this.remove();
        meteors.splice(i,1)
        rposition = 0
      }
    }//einde meteor loop
  }//einde hit
  
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