const Car = require("./car");
const Chicken = require("./chicken");
const Util = require("./util");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.newGame();

    this.handleKeyPress = this.handleKeyPress.bind(this);


    this.checkPass = this.checkPass.bind(this);
  }


  loadingScreen() {
    document.addEventListener('keydown', this.handleKeyPress);
    Util.screen(this.ctx);
  }


  newGame(){
    this.cars = [];
    this.addCar();
    this.chicken = new Chicken();
    this.lives = 3;
    this.level = 1;
  }

  handleKeyPress(e){
    let pos=[0,0];
    switch ( e.keyCode ){
      //LEFT
      case 37:
        pos = [-25, 0];
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

      case 78:
        this.newGame();
        this.start();
        break;

      default:
        pos = [0, 0];
    }

    this.chicken.move(pos);
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
      this.cars=[];
      this.addCar();
      this.chicken.draw(ctx);
      this.level += 1;
      this.relocateChicken();
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    Util.background(ctx);
    this.drawlevel(ctx);
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

  drawlevel(ctx){
    ctx.font="20px Georgia";
    ctx.fillText(this.level, 69,478);
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
