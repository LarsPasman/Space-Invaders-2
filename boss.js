
class Boss{
  constructor(){
    this.x = windowWidth/2
    this.y =  windowHeight/2 -100;
    this.height = 100
    this.width = 100
    this.speed = 15
    this.speedy = 12
  }

show(){
  image(baas, this.x, this.y, this.width, this.height)

   if(frameCount % 35 == 0){
      lasers.push(new Laser(this.x, this.y));
      laserSound.play();

     if(bossLives <= 0){
       gameState = 2;
       winSound.play();
     }
  }
}

move(){
  this.x = this.x -this.speed
  this.y = this.y -this.speedy

  if(this.x + this.width/2 >= windowWidth/2 + 320){
    this.speed = this.speed *-1
  }

  if(this.x - this.width/2 <= windowWidth/2 - 320){
    this.speed = this.speed *-1
  }

  if(this.y + this.height/2 >= windowHeight/2 +250){
    this.speedy = this.speedy *-1
  }

   if(this.y + this.height/2 <= windowHeight/2 -100){
    this.speedy = this.speedy *-1
  }
 }
}