class Chicken {
  constructor(options) {
    this.x = 250;
    this.y = 460;

    this.sprite = new Image();
    this.sprite.src = 'assets/chicken.png';
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
    ctx.drawImage(this.sprite, this.x-5, this.y-5);
    ctx.drawImage(this.sprite, this.x-10, this.y-10);
    ctx.drawImage(this.sprite, this.x-15, this.y-15);
    ctx.drawImage(this.sprite, this.x-20, this.y-10);
    ctx.drawImage(this.sprite, this.x-25, this.y);

  }

  move(pos){
    if(this.x + pos[0] > 0 && this.x + pos[0] < 500){
      this.x += pos[0];
    }
    if(this.y + pos[1] > 0 && this.y + pos[1] < 500){
      this.y += pos[1];
    }
  }

  isCollideWith(cars) {
    let bool = false;
    cars.forEach( car => {
      let carRangeX = [car.x, car.x + 80];
      let carRangeY = [car.y, car.y + 50];
      let chickenX = this.x + 25;
      let chickenY = this.y + 25;
      if (chickenX > carRangeX[0] && chickenX < carRangeX[1] && chickenY > carRangeY[0] && chickenY < carRangeY[1]) {
        bool = true;
      }
    });
    return bool;
  }

  jump(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -5, this.y - 5);
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -10, this.y - 10);
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -15, this.y - 15);
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -20, this.y - 10);
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -25, this.y - 5);
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.sprite, this.x -25, this.y);

  }

}
//

module.exports = Chicken;
