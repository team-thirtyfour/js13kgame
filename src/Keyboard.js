//LEFT=37, UP=38, RIGHT=39, DOWN=40
let keys = [false, false, false, false];

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

const X = 50;
const JUMP = -50;

export default (level) => {

    const e = level.playerEntity;
    if(keys[0]){
        e.velX = -X;
    }else if(keys[2]){
        e.velX = X;
    }
    // permit to go right or left AND jump
    if(keys[1] && e.canJump){
        e.velY += JUMP;
    }
    if(keys[3] && e.canJump){
        e.velY -= JUMP;
    }
};
