class Ship {
  constructor() {
    this.x = windowWidth/2;
    this.y = windowHeight/2 + 280;
    this.width = 50;
    this.height = 70;
    this.xdir = 0;
  }

  show() {
    image(playerImage, this.x, this.y, this.width, this.height);

  }
 shoot(){
      //schieten
    if (keyIsDown(32) && rocketCount > 0 && frameCount % 5 == 0) {
      var rocket = new Rocket(this.x, this.y);
      rockets.push(rocket);
      fireSound.play();
      rocketCount -= 1;
    }
 }

   shootBoss(){
      //schieten
    if (keyIsDown(32) && frameCount % 10 == 0) {
      var rocket = new Rocket(this.x, this.y);
      rockets.push(rocket);
      fireSound.play();
      rocketCount -= 1;
    }
  }
  move() {

    //movement keys
    if (keyIsDown(RIGHT_ARROW)|keyIsDown(68)){
      this.x += 10;
    }
    if (keyIsDown(LEFT_ARROW)|keyIsDown(65)){
      this.x -= 10;
    }

    //borders maken randen
   if(this.x - this.width/2 < windowWidth/2 - 320){
     this.x = windowWidth/2 - 320 + this.width/2;
   }
    if(this.x + this.width/2 > windowWidth/2 + 320){
     this.x = windowWidth/2 + 320 - this.width/2;
   }
 }
}