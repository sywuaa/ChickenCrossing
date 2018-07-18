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
    this.chicken.status = 'passed';
  }

  handleKeyPress(e){

    switch(e.keyCode){
      case 78:
        if(this.chicken === undefined || this.gameOver()){
          this.newGame();
          this.start();
        }else{
          this.newGame();
        }
        break;
    }

    if(this.chicken.status === ''){
      switch ( e.keyCode ){
        //LEFT
        case 37:
          this.chicken.jump('left');
          break;

        //UP
        case 38:
          this.chicken.jump('up');
          break;

        //RIGHT
        case 39:
          this.chicken.jump('right');
          break;

        //DOWN
        case 40:
          this.chicken.jump('down');
          break;

        default:
          this.chicken.status = '';
      }
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
    if( this.chicken.y < 10) {
      this.relocateChicken();
      this.chicken.status = 'passed';
      this.level += 1;
      this.cars=[];
      this.addCar();
      this.chicken.draw(ctx);

    }
  }

  draw(ctx) {
    this.checkPass(ctx);
    ctx.clearRect(0, 0, 500, 500);
    Util.background(ctx);
    this.drawLevel(ctx);
    this.drawLives(ctx);
    this.cars.forEach( car => {
      car.draw(ctx);
    });
    this.chicken.draw(ctx);
  }

  relocateChicken(){
    this.chicken = new Chicken();
  }

  stopAnimation(id){
    cancelAnimationFrame(id);
  }

  start() {
    if(this.chicken.isCollideWith(this.cars)){
      this.lives -= 1;
      this.relocateChicken();
      this.chicken.status = 'passed';
    }
    if(this.gameOver()){
      this.stopAnimation(this.animationID);
      this.endGame(this.ctx);
    }else {
      this.animationID = requestAnimationFrame(this.start.bind(this));
    }
    this.draw(this.ctx);
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

  [{ x: 130, speed: -1, img: 'assets/yellow-left.png'}, {x: 210, speed: -1, img: 'assets/yellow-left.png'}, {x: 290, speed: -1, img: 'assets/white-left.png'}],

  [{ x: 0, speed: -0.5, img: 'assets/yellow-left.png'}, {x: 80, speed: -0.5, img: 'assets/white-left.png'}, {x: 300, speed: -0.5, img: 'assets/white-left.png'}],

  [{ x: -80, speed: 0.5, img: 'assets/orange-right.png'}, {x: 250, speed: 0.5, img: 'assets/blue-right.png'}, {x: 340, speed: 0.5, img: 'assets/blue-right.png'}],

  [{ x: 70, speed: 1, img: 'assets/blue-right.png'}, {x: 250, speed:1, img: 'assets/orange-right.png'}, {x: 420, speed: 1, img: 'assets/orange-right.png'}],

  [{ x: 50, speed: 0.5, img: 'assets/blue-right.png'}, {x: 130, speed: 0.5, img: 'assets/orange-right.png'}, {x: 350, speed: 0.5, img: 'assets/blue-right.png'}],



  [{ x: 10, speed: -0.7, img: 'assets/white-left.png'}],

  [{ x: 200, speed: -1.2, img: 'assets/white-left.png'}],

  [{ x: 130, speed: -1.5, img: 'assets/yellow-left.png'}],

  [{ x: 25, speed: 0.3, img: 'assets/orange-right.png'}],

  [{ x: 100, speed: 1.4, img: 'assets/blue-right.png'}],

  [{ x: 220, speed: 1, img: 'assets/orange-right.png'}],

  [{ x: 70, speed: 0.4, img: 'assets/orange-right.png'}, {x: 250, speed: 0.4, img: 'assets/orange-right.png'}],

  [{ x: 70, speed: 1, img: 'assets/blue-right.png'}, {x: 420, speed: 1, img: 'assets/orange-right.png'}],

  [{ x: 70, speed: -0.4, img: 'assets/white-left.png'}, {x: 250, speed: -0.4, img: 'assets/white-left.png'}],

  [{ x: -20, speed: -0.8, img: 'assets/yellow-left.png'}, {x: 150, speed: -0.8, img: 'assets/white-left.png'}],

];

LANES = [380, 300, 225, 150, 70];

module.exports = Game;
