const Car = require("./car");
const Chicken = require("./chicken");
const Util = require("./util");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.checkPass = this.checkPass.bind(this);
  }


  loadingScreen() {
    document.addEventListener('keydown', this.handleKeyPress);
    Util.screen(this.ctx);
  }

  newGame(){
    this.level = 1;
    this.cars = [];
    this.addCar();
    this.chicken = new Chicken();
    this.lives = 5;
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
        if(this.chicken === undefined || this.gameOver()){
          this.newGame();
          this.start();
        }else{
          this.newGame();
        }
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
      this.level += 1;
      this.cars=[];
      this.addCar();
      this.chicken.draw(ctx);
      this.relocateChicken();
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    Util.background(ctx);
    this.drawLevel(ctx);
    this.drawLives(ctx);
    this.checkPass(ctx);
    this.cars.forEach( car => {
      car.draw(ctx);
    });
    this.move();
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

  stopAnimation(id){
    cancelAnimationFrame(id);
  }

  start() {
    this.draw(this.ctx);
    if(this.chicken.isCollideWith(this.cars)){
      this.lives -= 1;
      this.relocateChicken();
    }
    if(this.gameOver()){
      this.stopAnimation(this.animationID);
      this.endGame(this.ctx);
    }else {
      this.animationID = requestAnimationFrame(this.start.bind(this));
    }
  }

  endGame(ctx) {
    Util.endGame(ctx, this.level);
  }

  gameOver(){
    return (this.lives > 0) ? false : true;
  }

  drawLevel(ctx){
    ctx.font="20px Georgia";
    if(this.level < 10){
      ctx.fillText(this.level, 71,30);
    }else {
      ctx.fillText(this.level, 66,30);
    }
  }

  drawLives(ctx){
    ctx.font="20px Georgia";
    ctx.fillText(this.lives, 466,29);
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
