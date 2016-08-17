
export const KeyboardCsts = {
  UP_KEYCODE: 38,
  LEFT_KEYCODE: 37,
  RIGHT_KEYCODE: 39
}

let upPressed = false;
let leftPressed = false;
let rightPressed = false;

export class Keyboard {

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
