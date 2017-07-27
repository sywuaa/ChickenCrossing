const Util = require("./util");

class Chicken {
  constructor(options) {
    this.x = 230;
    this.y = 465;

    this.shadowX = 245;
    this.shadowY = 500;

    this.dead = 'false';

    this.left = new Image();
    this.left.src = 'assets/chickenLeft.png';
    this.right = new Image();
    this.right.src = 'assets/chickenRight.png';
    this.sprite = this.left;

    this.status = '';
    this.inAirCounter = 0;
    this.direction = '';
    this.joyJumpCounter = 0;
  }

  draw(ctx) {
    if(this.status === 'passed'){
      this.joyJumping();
    }else {
      this.move();
    }
    ctx.drawImage(this.sprite, this.x, this.y);
    Util.chickenShadow(ctx, this.shadowX, this.shadowY);
  }

  joyJumping(){
    if(this.joyJumpCounter % 16 < 8){
      this.y -= 2;
    }else {
      this.y += 2;
    }
    this.joyJumpCounter += 1;

    if(this.joyJumpCounter === 63){
      this.joyJumpCounter = 0;
      this.status = '';
    }
  }

  move(){

    if(this.status === 'inAir'){
      if(this.inAirCounter < 8){
        if(this.direction === 'left' || this.direction === 'right'){
          if(this.direction === 'left'){
            this.sprite = this.left;
            this.x -= 2;
            this.shadowX -= 2;
          }else {
            this.sprite = this.right;
            this.x += 2;
            this.shadowX += 2;
          }
          this.y -= AIRTIME.horizontal[this.inAirCounter];
        }else {
          if(this.direction === 'up'){
            this.y -= 5.5;
            this.shadowY -= 5.5;
          }else {
            this.y += 5.5;
            this.shadowY += 5.5;
          }
          this.x -= AIRTIME.vertical[this.inAirCounter];
        }
      }else {
        if(this.direction === 'left' || this.direction === 'right'){
          if(this.direction === 'left'){
            this.sprite = this.left;
            this.x -= 2;
            this.shadowX -= 2;
          }else {
            this.sprite = this.right;
            this.x += 2;
            this.shadowX += 2;
          }
          this.y += AIRTIME.horizontal[this.inAirCounter];
        }else {
          if(this.direction === 'up'){
            this.y -= 5.5;
            this.shadowY -= 5.5;
          }else {
            this.y += 5.5;
            this.shadowY += 5.5;
          }
          this.x += AIRTIME.vertical[this.inAirCounter];
        }
      }

      this.inAirCounter += 1;
    }

    if(this.inAirCounter === 15){
      this.status = '';
      this.inAirCounter = 1;
    }

  }

  isCollideWith(cars) {
    let bool = false;
    cars.forEach( car => {
      let carRangeX = [car.x, car.x + 100];
      let carRangeY = [car.y, car.y + 50];
      let chickenX = this.x + 25;
      let chickenY = this.y + 25;
      if (chickenX > carRangeX[0] && chickenX < carRangeX[1] && chickenY > carRangeY[0] && chickenY < carRangeY[1]) {
        bool = true;
      }
    });
    return bool;
  }

  jump(direction) {
      this.direction = direction;
      this.status = 'inAir';
  }

}

AIRTIME = {
  horizontal: [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  vertical: [0,2,3,0,0,0,0,0,0,0,0,0,0,3,2]
};



module.exports = Chicken;
