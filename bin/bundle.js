/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Car = __webpack_require__(1);
const Chicken = __webpack_require__(2);
const Util = __webpack_require__(4);

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
    ctx.clearRect(0, 0, 500, 500);
    Util.background(ctx);
    this.drawLevel(ctx);
    this.drawLives(ctx);
    this.checkPass(ctx);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
    this.move();
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

    new Game(ctx).loadingScreen();
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  background(ctx) {
    let sprite = new Image();
    sprite.src = 'assets/background.png';
    ctx.drawImage(sprite,0,0);
  },

  screen(ctx) {
    let sprite2 = new Image();
    sprite2.src = 'assets/startscreen2.png';
    sprite2.onload = () => ctx.drawImage(sprite2,0,0,500,500);
  },

  endGame(ctx, level) {
    let sprite3 = new Image();
    sprite3.src = 'assets/endgame2.png';
    sprite3.onload = () => {
      ctx.drawImage(sprite3,0,0,500,500);
      ctx.font="25px Georgia";
      ctx.fillText(level-1, 253,82);
    };
  },

  chickenShadow(ctx, x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y, 7, 2, Math.PI, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
  }

};



module.exports = Util;


/***/ })
/******/ ]);