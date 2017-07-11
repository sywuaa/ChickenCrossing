class Car {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.level = options.level;
    this.speed = options.speed;
    this.sprite = new Image();
    this.sprite.src = options.img;
  }

  draw(ctx,level) {
    ctx.drawImage(this.sprite, this.x, this.y, 80, 50);
    if(this.x > 500){
      this.x = -80;
    }else if (this.x < -80) {
      this.x = 500;
    }
  }

  move(){
    this.x += (this.speed * this.level/2);
  }
}

module.exports = Car;
