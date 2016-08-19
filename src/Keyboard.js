//LEFT=37, UP=38, RIGHT=39
let keys = [false, false, false];

const keyHandler = (val) => {
    return (e) => {
        let i = e.keyCode - 37;
        //key[37] can have a false value, so testing against undefined is needed
        if (keys[i] !== undefined) {
            keys[i] = val;
        }
    };
};

window.addEventListener('keydown', keyHandler(true), false);
window.addEventListener('keyup', keyHandler(false), false);

const X = 20;
const JUMP = -10;

export default (level) => {

  level.controllableEntities.forEach((e) => {
    if(keys[0]){
      e.velX = -X;
    }else if(keys[2]){
      e.velX = X;
    }else if(keys[1]){
      e.velY += JUMP;
    }
  });
}
