const DEFAULT_GRAVITY = 1;
const DEFAULT_VEL_X = 5;
const DEFAULT_JUMP_VEL = -10;

export default class Physics {

  static checkCollision(eA, eB){
    return !((eA.x >= eB.x + eB.width)
  	|| (eA.x + eA.width <= eB.x)
  	|| (eA.y >= eB.y + eB.height)
  	|| (eA.y + eA.height <= eB.y));
  }

  static moveLeft(e, vel){
    vel = vel || DEFAULT_VEL_X;
    e.velX = -vel;
  }

  static moveRight(e, vel){
    vel = vel || DEFAULT_VEL_X;
    e.velX = vel;
  }

  static jump(e, jumpVel){
    jumpVel = jumpVel || DEFAULT_JUMP_VEL;
    e.velY += jumpVel;
  }

  static update(e){
    e.x += e.velX;
    e.velX = 0;
    e.y += e.velY;
    e.velY += DEFAULT_GRAVITY;
  }
}
