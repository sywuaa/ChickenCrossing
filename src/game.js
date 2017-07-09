const Car = require("./car");
const Chicken = require("./chicken");
const Util = require("./util");

class Game {
  constructor(ctx) {
    this.cars = [];
    this.ctx = ctx;
    this.chicken = new Chicken();
    this.timer = 0;
    this.lives = 3;
    this.level = 1;
    this.addCar();

    this.handleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.handleKeyPress);

    this.checkPass = this.checkPass.bind(this);
  }

  handleKeyPress(e){
    let pos;
    switch ( e.keyCode ){
      //LEFT
      case 37:
        this.chicken.jump(this.ctx);
        // pos = [-25, 0];
        break;

      //UP
      case 38:
        pos = [0, -76];
        break;

      //RIGHT
      case 39:
        pos = [25, 0];
        break;

      //DOWN
      case 40:
        pos = [0, 76];
        break;

      default:
        pos = [0, 0];
    }
  }

  addCar() {
    LANES.forEach( y => {
      let num = Math.floor(Math.random() * CARS.length);
      let cars = CARS[num];
      cars.forEach( car => {
        car.y = y;
        car.level = this.level;
        this.cars.push(new Car(car));
      });
    });
  }

  checkPass(ctx){
    if( this.chicken.y < 30) {
      this.chicken.draw(ctx);
      this.level += 1;
      this.relocateChicken();
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    Util.background(ctx);
    this.checkPass(ctx);
    this.move();
    this.cars.forEach( car => {
      car.draw(ctx, this.level/5);
    });
    this.chicken.draw(ctx);
  }

  move(){
    this.cars.forEach( car => {
      car.move();
    });
  }

  relocateChicken(){
    this.chicken = new Chicken();
  }

  start() {
    this.draw(this.ctx);
    if(this.chicken.isCollideWith(this.cars)){
      this.live -= 1;
      this.relocateChicken();
    }
    requestAnimationFrame(this.start.bind(this));
  }

  pause() {
    this.draw(this.ctx);
  }

}

CARS = [
  [{ x: 50, speed: 0.5, img: 'assets/right.png'}, {x: 130, speed: 0.5, img: 'assets/right.png'}, {x: 210, speed: 0.5, img: 'assets/right.png'}, {x: 350, speed: 0.5, img: 'assets/right.png'}],

  [{ x: 130, speed: -1, img: 'assets/left.png'},{x: 210, speed: -1, img: 'assets/left.png'}, {x: 290, speed: -1, img: 'assets/left.png'}, {x: 500, speed: -1, img: 'assets/left.png'}],

  [{ x: -80, speed: 0.5, img: 'assets/right.png'},{x: 0, speed: 0.5, img: 'assets/right.png'}, {x: 250, speed: 0.5, img: 'assets/right.png'}, {x: 340, speed: 0.5, img: 'assets/right.png'}],

  [{ x: 70, speed: 1, img: 'assets/right.png'},{x: 250, speed:1, img: 'assets/right.png'}, {x: 420, speed: 1, img: 'assets/right.png'}],

  [{ x: 0, speed: -0.5, img: 'assets/left.png'},{x: 80, speed: -0.5, img: 'assets/left.png'}, {x: 300, speed: -0.5, img: 'assets/left.png'}],

  [{ x: 130, speed: -0.5, img: 'assets/left.png'},{x: 210, speed: -0.5, img: 'assets/left.png'}, {x: 400, speed: -0.5, img: 'assets/left.png'}],

];

LANES = [380, 300, 225, 150, 70];

module.exports = Game;
