(function () {
'use strict';

class Level {

    constructor (entities, gravity) {
        this.entities = entities;
        this.gravity = gravity;

        this.movableEntities = this.entities.filter((e) => e.isMovable);
        this.controllableEntities = this.entities.filter((e) => e.isControllable);
    }

}

class Entity {

    constructor (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isControllable) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        this.collisionFactorX = collisionFactorX;
        this.collisionFactorY = collisionFactorY;
        this.forme = forme;
        this.color = color;
        this.isMovable = isMovable;
        this.isControllable = isControllable;
    }

}

const levels = ["_:2.10...", "/:2.4..."]; // should be serialized levels array (TODO)

var LevelDeserializer = (levelIndex) => {
    return parse(levels[levelIndex]); // should be a Level
}

const parse = (levelStr) => {
    //TODO
    const player = new Entity(100, 10, 10, 10, 0, 0, 0, 0, 'circle', 'red', true, true);
    const ground = new Entity(0, 185, 500, 10, 0, 0, 0, -0.2, 'square', 'blue', false, false);
    return new Level([player, ground], 0.1);
};

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

var Keyboard = {
    onLeft: (cb) => keys[0].push(cb),
    onUp: (cb) => keys[1].push(cb),
    onRight: (cb) => keys[2].push(cb)
}

window.addEventListener('keyup', keyHandler(), false);
window.addEventListener('keydown', keyHandler(), false);

const X = 20;
const JUMP = -10;

var KeyboardController = (level) => {

    Keyboard.onLeft(() => {
        console.log('left');
        level.controllableEntities.forEach((e) => e.velX = -X)
    });
    Keyboard.onRight(() => level.controllableEntities.forEach((e) => e.velX = X));
    Keyboard.onUp(() => level.controllableEntities.forEach((e) => e.velY += JUMP));

}

const GRAVITY = 1;

var Physics = {
    update: (level) => {
        level.movableEntities.forEach((e) => {
            e.x += e.velX;
            e.velX = 0;
            e.y += e.velY;
            e.velY += level.gravity || GRAVITY;
        });
    }
}

const render = (ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    ctx.clearRect(0, 0, 600, 800);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(entity.x, entity.y, entity.width, entity.height);
    ctx.fillStyle = entity.color;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
};

var Renderer = {
    render: (level, canvasMovable, canvasStatic) => {
        const ctxMovable = canvasMovable.getContext('2d');
        const ctxStatic = canvasStatic.getContext('2d');
        level.entities.forEach((e) => {
            if(e.isMovable) {
                render(ctxMovable, e);
            } else {
                render(ctxStatic, e);//TODO init at start and not re-render each loop
            }
        });
    }
}

const checkCollision = (eA, eB) => {
    return !((eA.x >= eB.x + eB.width)
    || (eA.x + eA.width <= eB.x)
    || (eA.y >= eB.y + eB.height)
    || (eA.y + eA.height <= eB.y));
};

var Collision = {

    check: (level) => {
        //TODO naive implementation == change me
        let collision = false;
        level.entities.forEach((eA) => {
            level.entities.forEach((eB) => {
                if(eA !== eB && checkCollision(eA, eB)) {
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                }
            });
        });
        return collision;
    }

}

const FRAMERATE = 60;

var MainLoop = (level, canvasMovable, canvasStatic) => {

  const loop = () => {

    // On est pas sur de cet ordre
    Physics.update(level);
    Renderer.render(level, canvasMovable, canvasStatic);
    Collision.check(level);

    //Check la fin du niveau (mort ou a atteint la porte)
    //c'est une collision dans tous les cas, a voir si on la fait
    //directement dans Collision

    setTimeout(loop, 1 / FRAMERATE * 1000);
  };

  loop();  
}

var canvasStatic = document.createElement('canvas');
canvasStatic.width = '600';
canvasStatic.height = '800';
document.getElementsByTagName('body')[0].appendChild(canvasStatic);

var canvasMovable = document.createElement('canvas');
canvasMovable.width = '600';
canvasMovable.height = '800';
document.getElementsByTagName('body')[0].appendChild(canvasMovable);

const levelIndex = 0;

const level = LevelDeserializer(levelIndex);
KeyboardController(level);
MainLoop(level, canvasMovable, canvasStatic);

}());