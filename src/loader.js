const Game = require("./game");

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

    new Game(ctx).loadingScreen();
});
