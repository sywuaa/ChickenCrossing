const Game = require("./game");

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  //
  // document.addEventListener('keydown', e => {
  //   if( e.keyCode === 78) {
      new Game(ctx).start();
  //   }
  // });
});
