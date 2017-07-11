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
/***/ (function(module, exports) {

class Chicken {
  constructor(options) {
    this.x = 250;
    this.y = 460;
    this.dead = 'false';

    this.sprite = new Image();
    this.sprite.src = 'assets/chicken.png';
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
    // ctx.drawImage(this.sprite, this.x-5, this.y-5);
    // ctx.drawImage(this.sprite, this.x-10, this.y-10);
    // ctx.drawImage(this.sprite, this.x-15, this.y-15);
    // ctx.drawImage(this.sprite, this.x-20, this.y-10);
    // ctx.drawImage(this.sprite, this.x-25, this.y);

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
    sprite2.src = 'assets/startscreen.png';

    sprite2.onload = () =>{
      ctx.drawImage(sprite2, 0, 0, 500, 500);
    };
  },
  endGame(ctx, level) {
    let sprite3 = new Image();
    sprite3.src = 'assets/endgame2.png';

    sprite3.onload = () =>{
      ctx.drawImage(sprite3, 0, 0, 500, 500);
      ctx.font="25px Georgia";
      ctx.fillText(level-1, 253,82);
    };

  },

};



module.exports = Util;


/***/ })
/******/ ]);