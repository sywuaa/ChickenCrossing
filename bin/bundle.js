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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/car.js":
/*!********************!*\
  !*** ./src/car.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Car {\n  constructor(options){\n    this.x = options.x;\n    this.y = options.y;\n    this.level = options.level;\n    this.speed = options.speed;\n    this.sprite = new Image();\n    this.sprite.src = options.img;\n  }\n\n  draw(ctx,level) {\n    this.move();\n    ctx.drawImage(this.sprite, this.x, this.y, 80, 50);\n    if(this.x > 500){\n      this.x = -80;\n    }else if (this.x < -80) {\n      this.x = 500;\n    }\n  }\n\n  move(){\n    this.x += (this.speed * this.level/2);\n  }\n}\n\nmodule.exports = Car;\n\n\n//# sourceURL=webpack:///./src/car.js?");

/***/ }),

/***/ "./src/chicken.js":
/*!************************!*\
  !*** ./src/chicken.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Chicken {\n  constructor(options) {\n    this.x = 230;\n    this.y = 465;\n\n    this.shadowX = 245;\n    this.shadowY = 500;\n\n    this.dead = 'false';\n\n    this.left = new Image();\n    this.left.src = 'assets/chickenLeft.png';\n    this.right = new Image();\n    this.right.src = 'assets/chickenRight.png';\n    this.sprite = this.left;\n\n    this.status = '';\n    this.inAirCounter = 0;\n    this.direction = '';\n    this.joyJumpCounter = 0;\n  }\n\n  draw(ctx) {\n    if(this.status === 'passed'){\n      this.joyJumping();\n    }else {\n      this.move();\n    }\n    ctx.drawImage(this.sprite, this.x, this.y);\n    Util.chickenShadow(ctx, this.shadowX, this.shadowY);\n  }\n\n  joyJumping(){\n    if(this.joyJumpCounter % 16 < 8){\n      this.y -= 2;\n    }else {\n      this.y += 2;\n    }\n    this.joyJumpCounter += 1;\n\n    if(this.joyJumpCounter === 63){\n      this.joyJumpCounter = 0;\n      this.status = '';\n    }\n  }\n\n  move(){\n    if(this.status === 'inAir'){\n      if(this.inAirCounter < 8){\n        if(this.direction === 'left' || this.direction === 'right'){\n          if(this.direction === 'left'){\n            this.sprite = this.left;\n            this.x -= 2;\n            this.shadowX -= 2;\n          }else {\n            this.sprite = this.right;\n            this.x += 2;\n            this.shadowX += 2;\n          }\n          this.y -= AIRTIME.horizontal[this.inAirCounter];\n        }else {\n          if(this.direction === 'up'){\n            this.y -= 5.5;\n            this.shadowY -= 5.5;\n          }else {\n            this.y += 5.5;\n            this.shadowY += 5.5;\n          }\n          this.x -= AIRTIME.vertical[this.inAirCounter];\n        }\n      }else {\n        if(this.direction === 'left' || this.direction === 'right'){\n          if(this.direction === 'left'){\n            this.sprite = this.left;\n            this.x -= 2;\n            this.shadowX -= 2;\n          }else {\n            this.sprite = this.right;\n            this.x += 2;\n            this.shadowX += 2;\n          }\n          this.y += AIRTIME.horizontal[this.inAirCounter];\n        }else {\n          if(this.direction === 'up'){\n            this.y -= 5.5;\n            this.shadowY -= 5.5;\n          }else {\n            this.y += 5.5;\n            this.shadowY += 5.5;\n          }\n          this.x += AIRTIME.vertical[this.inAirCounter];\n        }\n      }\n      this.inAirCounter += 1;\n    }\n\n    if(this.inAirCounter === 15){\n      this.status = '';\n      this.inAirCounter = 1;\n    }\n\n  }\n\n  isCollideWith(cars) {\n    let bool = false;\n    cars.forEach( car => {\n      let carRangeX = [car.x, car.x + 100];\n      let carRangeY = [car.y, car.y + 50];\n      let chickenX = this.x + 25;\n      let chickenY = this.y + 25;\n      if (chickenX > carRangeX[0] && chickenX < carRangeX[1] && chickenY > carRangeY[0] && chickenY < carRangeY[1]) {\n        bool = true;\n      }\n    });\n    return bool;\n  }\n\n  jump(direction) {\n    if(direction === 'left' && this.x - 30 < 0){\n      this.status = '';\n    }else if (direction === 'right' && this.x + 50 > 500) {\n      this.status = '';\n    }else if (direction === 'down' && this.y + 50 > 500){\n      this.status = '';\n    }else{\n      this.direction = direction;\n      this.status = 'inAir';\n    }\n  }\n\n}\n\nAIRTIME = {\n  horizontal: [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2],\n  vertical: [0,2,3,0,0,0,0,0,0,0,0,0,0,3,2]\n};\n\n\n\nmodule.exports = Chicken;\n\n\n//# sourceURL=webpack:///./src/chicken.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Car = __webpack_require__(/*! ./car */ \"./src/car.js\");\nconst Chicken = __webpack_require__(/*! ./chicken */ \"./src/chicken.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.handleKeyPress = this.handleKeyPress.bind(this);\n    this.checkPass = this.checkPass.bind(this);\n  }\n\n\n  loadingScreen() {\n    document.addEventListener('keydown', this.handleKeyPress);\n    Util.screen(this.ctx);\n  }\n\n  newGame(){\n    this.level = 1;\n    this.cars = [];\n    this.addCar();\n    this.chicken = new Chicken();\n    this.lives = 5;\n    this.chicken.status = 'passed';\n  }\n\n  handleKeyPress(e){\n\n    switch(e.keyCode){\n      case 78:\n        if(this.chicken === undefined || this.gameOver()){\n          this.newGame();\n          this.start();\n        }else{\n          this.newGame();\n        }\n        break;\n    }\n\n    if(this.chicken.status === ''){\n      switch ( e.keyCode ){\n        //LEFT\n        case 37:\n          this.chicken.jump('left');\n          break;\n\n        //UP\n        case 38:\n          this.chicken.jump('up');\n          break;\n\n        //RIGHT\n        case 39:\n          this.chicken.jump('right');\n          break;\n\n        //DOWN\n        case 40:\n          this.chicken.jump('down');\n          break;\n\n        default:\n          this.chicken.status = '';\n      }\n    }\n  }\n\n  addCar() {\n    LANES.forEach( y => {\n      let num = Math.floor(Math.random() * CARS.length);\n      let cars = CARS[num];\n      cars.forEach( car => {\n        car.y = y;\n        car.level = this.level;\n        this.cars.push(new Car(car));\n      });\n    });\n  }\n\n  checkPass(ctx){\n    if( this.chicken.y < 10) {\n      this.relocateChicken();\n      this.chicken.status = 'passed';\n      this.level += 1;\n      this.cars=[];\n      this.addCar();\n      this.chicken.draw(ctx);\n\n    }\n  }\n\n  draw(ctx) {\n    this.checkPass(ctx);\n    ctx.clearRect(0, 0, 500, 500);\n    Util.background(ctx);\n    this.drawLevel(ctx);\n    this.drawLives(ctx);\n    this.cars.forEach( car => {\n      car.draw(ctx);\n    });\n    this.chicken.draw(ctx);\n  }\n\n  relocateChicken(){\n    this.chicken = new Chicken();\n  }\n\n  stopAnimation(id){\n    cancelAnimationFrame(id);\n  }\n\n  start() {\n    if(this.chicken.isCollideWith(this.cars)){\n      this.lives -= 1;\n      this.relocateChicken();\n      this.chicken.status = 'passed';\n    }\n    if(this.gameOver()){\n      this.stopAnimation(this.animationID);\n      this.endGame(this.ctx);\n    }else {\n      this.animationID = requestAnimationFrame(this.start.bind(this));\n    }\n    this.draw(this.ctx);\n  }\n\n  endGame(ctx) {\n    Util.endGame(ctx, this.level);\n  }\n\n  gameOver(){\n    return (this.lives > 0) ? false : true;\n  }\n\n  drawLevel(ctx){\n    ctx.font=\"20px Georgia\";\n    if(this.level < 10){\n      ctx.fillText(this.level, 71,30);\n    }else {\n      ctx.fillText(this.level, 66,30);\n    }\n  }\n\n  drawLives(ctx){\n    ctx.font=\"20px Georgia\";\n    ctx.fillText(this.lives, 466,29);\n  }\n\n}\n\nCARS = [\n  [{ x: 50, speed: 0.5, img: 'assets/right.png'}, {x: 130, speed: 0.5, img: 'assets/right.png'}, {x: 210, speed: 0.5, img: 'assets/right.png'}, {x: 350, speed: 0.5, img: 'assets/right.png'}],\n\n  [{ x: 130, speed: -1, img: 'assets/left.png'},{x: 210, speed: -1, img: 'assets/left.png'}, {x: 290, speed: -1, img: 'assets/left.png'}, {x: 500, speed: -1, img: 'assets/left.png'}],\n\n  [{ x: -80, speed: 0.5, img: 'assets/right.png'},{x: 0, speed: 0.5, img: 'assets/right.png'}, {x: 250, speed: 0.5, img: 'assets/right.png'}, {x: 340, speed: 0.5, img: 'assets/right.png'}],\n\n  [{ x: 70, speed: 1, img: 'assets/right.png'},{x: 250, speed:1, img: 'assets/right.png'}, {x: 420, speed: 1, img: 'assets/right.png'}],\n\n  [{ x: 0, speed: -0.5, img: 'assets/left.png'},{x: 80, speed: -0.5, img: 'assets/left.png'}, {x: 300, speed: -0.5, img: 'assets/left.png'}],\n\n  [{ x: 130, speed: -0.5, img: 'assets/left.png'},{x: 210, speed: -0.5, img: 'assets/left.png'}, {x: 400, speed: -0.5, img: 'assets/left.png'}],\n\n];\n\nLANES = [380, 300, 225, 150, 70];\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  let canvas = document.getElementById('canvas');\n  let ctx = canvas.getContext('2d');\n\n    new Game(ctx).loadingScreen();\n});\n\n\n//# sourceURL=webpack:///./src/loader.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  background(ctx) {\n    let sprite = new Image();\n    sprite.src = 'assets/background.png';\n    ctx.drawImage(sprite,0,0);\n  },\n\n  screen(ctx) {\n    let sprite2 = new Image();\n    sprite2.src = 'assets/newscreen.png';\n    sprite2.onload = () => ctx.drawImage(sprite2,0,0,500,500);\n  },\n\n  endGame(ctx, level) {\n    let sprite3 = new Image();\n    sprite3.src = 'assets/endgame2.png';\n    sprite3.onload = () => {\n      ctx.drawImage(sprite3,0,0,500,500);\n      ctx.font=\"25px Georgia\";\n      ctx.fillText(level-1, 253,82);\n    };\n  },\n\n  chickenShadow(ctx, x, y) {\n    ctx.beginPath();\n    ctx.ellipse(x, y, 7, 2, Math.PI, 0, 2 * Math.PI);\n    ctx.stroke();\n    ctx.closePath();\n    ctx.fillStyle = 'black';\n    ctx.fill();\n  }\n\n};\n\n\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });