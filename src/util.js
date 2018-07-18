const Util = {
  background(ctx) {
    let sprite = new Image();
    sprite.src = 'assets/background.png';
    ctx.drawImage(sprite,0,0);
  },

  screen(ctx) {
    let sprite2 = new Image();
    sprite2.src = 'assets/newb2.png';
    sprite2.onload = () => ctx.drawImage(sprite2,0,0,500,500);
  },

  endGame(ctx, level) {
    let sprite3 = new Image();
    sprite3.src = 'assets/newEndGame.png';
    sprite3.onload = () => {
      ctx.drawImage(sprite3,0,0,500,500);
      ctx.font="25px Georgia";
      ctx.fillText(level-1, 262,77);
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
