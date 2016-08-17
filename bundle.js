(function () {
'use strict';

const KeyboardCsts = {
  UP_KEYCODE: 38,
  LEFT_KEYCODE: 37,
  RIGHT_KEYCODE: 39
}

let upPressed = false;
let leftPressed = false;
let rightPressed = false;

class Keyboard {

  static _keyDownHandler(e){
    switch(e.keyCode){
      case KeyboardCsts.UP_KEYCODE:
        upPressed = true;
        break;
      case KeyboardCsts.LEFT_KEYCODE:
        leftPressed = true;
        break;
      case KeyboardCsts.RIGHT_KEYCODE:
        rightPressed = true;
        break;
      default:
        break;
    }
  }

  static _keyUpHandler(e){
    switch(e.keyCode){
      case KeyboardCsts.UP_KEYCODE:
        upPressed = false;
        break;
      case KeyboardCsts.LEFT_KEYCODE:
        leftPressed = false;
        break;
      case KeyboardCsts.RIGHT_KEYCODE:
        rightPressed = false;
        break;
      default:
        break;
    }
  }

  static isKeyPressed(keyCode){
    switch(keyCode){
      case KeyboardCsts.UP_KEYCODE:
        return upPressed;
        break;
      case KeyboardCsts.LEFT_KEYCODE:
        return leftPressed;
        break;
      case KeyboardCsts.RIGHT_KEYCODE:
        return rightPressed;
        break;
      default:
        break;
    }
  }

}

window.addEventListener('keydown', Keyboard._keyDownHandler, false);
window.addEventListener('keyup', Keyboard._keyUpHandler, false);

const DEFAULT_GRAVITY = 1;
const DEFAULT_VEL_X = 5;
const DEFAULT_JUMP_VEL = -10;

class Physics {

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

class Entity {

  constructor (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velX = 0;
    this.velY = 0;
  }
}

//Will be the final 'FPS'
const REFRESH_RATE = 60;

var canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = '600';
canvas.height = '800';
document.getElementsByTagName('body')[0].appendChild(canvas);


var ctx = canvas.getContext('2d');
var player = new Entity(100, 10, 10, 10);
var ground = new Entity(0, 185, 50, 10);
player.onGround = false;

class EventLoop {

    static start() {
        EventLoop.loop();
    }

    static loop() {

      if(Keyboard.isKeyPressed(KeyboardCsts.LEFT_KEYCODE)){
        Physics.moveLeft(player);
      }else if(Keyboard.isKeyPressed(KeyboardCsts.RIGHT_KEYCODE)){
        Physics.moveRight(player);
      }

      if(Keyboard.isKeyPressed(KeyboardCsts.UP_KEYCODE) && player.onGround){
        Physics.jump(player);
      }

      if(Physics.checkCollision(player, ground)){
        player.velY = 0;
        player.y = ground.y - player.height;
      }

      player.onGround =
        (player.y === (ground.y - 10) && (player.x < ground.x + ground.width));


      Physics.update(player);
      EventLoop.render(player);
      EventLoop.render(ground);

      setTimeout(EventLoop.loop, (1 / REFRESH_RATE) * 1000);
    }

    static render(entity)
    {
        ctx.clearRect(0, 0, 600, 800);
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(entity.x, entity.y, entity.width, entity.height);
        ctx.closePath();
        ctx.stroke();
    }

}

console.log('ok watch 22');
EventLoop.start();

}());