const Util = {
  background(ctx) {
    let sprite = new Image();
    sprite.src = 'assets/background.png';
    ctx.drawImage(sprite,0,0);
  }
};

module.exports = Util;
