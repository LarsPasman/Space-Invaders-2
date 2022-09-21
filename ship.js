class Ship {
  constructor() {
    this.x = width / 2
    this.y = height - 40;
    this.width = 50
    this.height = 70;
    this.xdir = 0;
  }

  show() {
    image(playerImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(32)) {
      var rocket = new Rocket(this.x, this.y);
      rockets.push(rocket);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      ship.x += 10;
    }

    if (keyIsDown(LEFT_ARROW)) {
      ship.x -= 10;
    }

    //this.x += this.xdir * 10
  }
  setDir(dir) {
    this.xdir = dir;
  }
}