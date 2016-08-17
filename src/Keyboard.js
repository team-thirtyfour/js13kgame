//LEFT=37, UP=38,RIGHT=39
let keys = [false, false, false];

function keyHandler(val) {
    return (e) => {
        let i = e.keyCode - 37;
        //key[37] can have a false value, so testing against undefined is needed
        if (keys[i] !== undefined) {
            keys[i] = val;
        }
    };
}

export default {
    isLeft: () => keys[0],
    isUp: () => keys[1],
    isRight: () => keys[2]
}

window.addEventListener('keyup', keyHandler(false), false);
window.addEventListener('keydown', keyHandler(true), false);
