import Keyboard from './Keyboard';
import Physics from './Physics';
import Entity from './Entity';

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

export default class EventLoop {

    static start() {
        EventLoop.loop();
    }

    static loop() {

      if(Keyboard.isLeft()){
        Physics.moveLeft(player);
      }else if(Keyboard.isRight()){
        Physics.moveRight(player);
      }

      if(Keyboard.isUp() && player.onGround){
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
