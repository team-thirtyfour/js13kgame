const DEFAULT_GRAVITY = 5;

class Entity {

  constructor (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class Physics {

  static checkCollision(eA, eB){
    return !((eA.x >= eB.x + eB.width)
  	|| (eA.x + eA.width <= eB.x)
  	|| (eA.y >= eB.y + eB.height)
  	|| (eA.y + eA.height <= eB.y));
  }

  static applyGravity(e, gravity){
    gravity = gravity || DEFAULT_GRAVITY;
    e.y += gravity;
  }
}
