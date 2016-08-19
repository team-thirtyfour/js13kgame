//LEFT=37, UP=38, RIGHT=39
let keys = [[], [], []];

const keyHandler = () => {
    return (e) => {
        let i = e.keyCode - 37;
        //key[37] can have a false value, so testing against undefined is needed
        if (keys[i] !== undefined) {
            keys[i].forEach((cb) => cb());
        }
    };
};

export default {
    onLeft: (cb) => keys[0].push(cb),
    onUp: (cb) => keys[1].push(cb),
    onRight: (cb) => keys[2].push(cb)
}

window.addEventListener('keyup', keyHandler(), false);
window.addEventListener('keydown', keyHandler(), false);
