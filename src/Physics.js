const GRAVITY = 1;
const X = 5;
const JUMP = -10;

export default {
    moveLeft: (e, vel) => {
        e.velX = -(vel || X);
    },
    moveRight: (e, vel) => {
        e.velX = vel || X;
    },
    jump: (e, vel) => {
        e.velY += vel || JUMP;
    },
    update: (e) => {
        e.x += e.velX;
        e.velX = 0;
        e.y += e.velY;
        e.velY += GRAVITY;
    },
    checkCollision: (eA, eB) => {
        return !((eA.x >= eB.x + eB.width)
                || (eA.x + eA.width <= eB.x)
                || (eA.y >= eB.y + eB.height)
                || (eA.y + eA.height <= eB.y));
    }
}

