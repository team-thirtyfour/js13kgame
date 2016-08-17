const UP_KEYCODE = 38;
const LEFT_KEYCODE = 37;
const RIGHT_KEYCODE = 39;

export default class Keyboard {


  constructor(){

    this.upPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;

    document.addEventListener("keydown", this._keyDownHandler, false);
    document.addEventListener("keyup", this._keyUpHandler, false);
  }

  _keyDownHandler(e){
    if(e.keyCode === UP_KEYCODE) this.upPressed = true;
    else if(e.keyCode === LEFT_KEYCODE) this.leftPressed = true;
    else if (e.keyCode === RIGHT_KEYCODE) this.rightPressed = true;
  }

  _keyUpHandler(e){
    if(e.keyCode === UP_KEYCODE) this.upPressed = false;
    else if(e.keyCode === LEFT_KEYCODE) this.leftPressed = false;
    else if (e.keyCode === RIGHT_KEYCODE) this.rightPressed = false;
  }

  isKeyPressed(keyCode){
    if(keyCode === UP_KEYCODE) return this.UP_KEYCODE;
    else if (keyCode === LEFT_KEYCODE) return this.LEFT_KEYCODE;
    else if (keyCode === RIGHT_KEYCODE) return this.RIGHT_KEYCODE;
  }

}
