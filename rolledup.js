(function () {
'use strict';

var Level = (entities, gravity) => {
    return {
        entities: entities,
        gravity: gravity,
        movableEntities: entities.filter((e) => e.isMovable),
        controllableEntities: entities.filter((e) => e.isControllable)
    };
}

var Entity = (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isControllable, isKiller, isFinisher) => {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        velX: velX,
        velY: velY,
        collisionFactorX: collisionFactorX,
        collisionFactorY: collisionFactorY,
        forme: forme,
        color: color,
        isMovable: isMovable,
        isControllable: isControllable,
        isKiller: isKiller,
        isFinisher: isFinisher,

        isKilled: false,
        canJump: false
    };
}

const FORME_RECT = 0;
const FORME_CIRCLE = 1;
const FORME_TRIANGLE = 2;

const render = (canvas, ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    const relative = compute(canvas, entity);
    ctx.fillStyle = entity.color;
    ctx.beginPath();
    if(entity.forme === FORME_RECT) {
        ctx.rect(relative.x, relative.y, relative.width, relative.height);
    } else if(entity.forme === FORME_CIRCLE) {
        ctx.arc(relative.x+relative.width/2, relative.y+relative.height/2, relative.width/2, 0, 2*Math.PI);
    } else if(entity.forme === FORME_TRIANGLE) {
        ctx.moveTo(relative.x+relative.width/2, relative.y);
        ctx.lineTo(relative.x+relative.width, relative.y+relative.height);
        ctx.lineTo(relative.x, relative.y+relative.height)
    }
    ctx.closePath();
    ctx.fill();
};

const compute = (canvas, entity) => {
    return {
        x: entity.x * canvas.width / 100,
        y: entity.y * canvas.height / 100,
        width: entity.width * canvas.width / 100,
        height: entity.height * canvas.height / 100
    }
};

const draw = (canvas, entities) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach((e) => render(canvas, ctx, e));
};

var Renderer$1 = {

    init: (level) => {
        draw(canvasMovable, level.entities.filter((e) => e.isMovable));
        draw(canvasStatic, level.entities.filter((e) => !e.isMovable));
    },

    render: (level) => {
        draw(canvasMovable, level.entities.filter((e) => e.isMovable));
    }
}

var canvasStatic = document.createElement('canvas');
canvasStatic.width = window.innerWidth * 0.8;
canvasStatic.height = window.innerHeight * 0.8;
document.getElementsByTagName('body')[0].appendChild(canvasStatic);

var canvasMovable = document.createElement('canvas');
canvasMovable.width = window.innerWidth * 0.8;
canvasMovable.height = window.innerHeight * 0.8;
document.getElementsByTagName('body')[0].appendChild(canvasMovable);

window.addEventListener('resize', () => {
    canvasStatic.width = window.innerWidth * 0.8;
    canvasStatic.height = window.innerHeight * 0.8;
    canvasMovable.width = window.innerWidth * 0.8;
    canvasMovable.height = window.innerHeight * 0.8;
    Renderer.init(level, canvasMovable, canvasStatic);
}, false);

var LevelDeserializer = (levelIndex) => {
    return parse(levels[levelIndex]); // should be a Level
}

const parse = (level) => {

    var entitiesStr = level[1].split('/');
    var entities = entitiesStr.map((e)=>{
        var str = e.split(',');
        switch(str[0]){
            case 'J':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), 2, 2, 0, 0, 0, 0, FORME_CIRCLE, 'red', true, true, false, false);
            case 'M':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, 0, FORME_TRIANGLE, 'grey', false, false, true, false);
            case 'T':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, -0.5, FORME_RECT, 'blue', false, false, false, false);
            case 'G':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), 3, 5, 0, 0, 0, 0, FORME_RECT, 'violet', false, false, false, true);
        }

    });

    return Level(entities, level[0]);
};

/**
 * first number : gravity
 * J,x,y : Joueur => new Entity(x, y, 2, 2, 0, 0, 0, 0, 'circle', 'red', true, true)
 * M,x,y,w,h : Mur => new Entity(x, y, w, h, 0, 0, 0, 0, 'square', 'grey', false, false)
 * T,x,y,w,h : Trampoline => new Entity(x, y, w, h, 0, 0, 0, -0.2, 'square', 'bleu', false, false)
 */
const levels = [
      //level 1
    [0.05,'J,10,10/T,0,50,80,2/M,50,10,2,40/G,70,45' ]
    , // level 2
    [0.05,'J,50,10/T,0,90,95,2/G,90,5']
];

var Console = (level) => {

}

var Physics = {
    update: (level) => {
        level.movableEntities.forEach((e) => {
            e.x += e.velX;
            e.velX = 0;
            e.y += e.velY;
            e.velY += level.gravity;
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

    /**
     *
     * @param level
     * @returns {boolean} true when game is won
     */
    check: (level) => {
        let gameIsWin = false;
        //TODO naive implementation == change me
        level.entities.forEach((eA) => {
            eA.canJump = false;
            level.entities.forEach((eB) => {
                if(eA !== eB && checkCollision(eA, eB)) {
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y - eA.height;

                    //This means that we can jump or bounce on the surface
                    if(eB.collisionFactorY < 0) {
                      eA.canJump = true;
                    }

                    if(eB.isKiller) {
                        eA.isKilled = true;
                    }

                    if(eB.isFinisher) {
                        gameIsWin = true;
                    }
                }
            });
        });
        return gameIsWin;
    },
    checkGameOver: (level) => {
        // when 1 controllable entity is outside of game
        return !!level.controllableEntities.find((e) => e.x > 100 || e.x < 0 || e.y > 100 || e.y < 0);
    }

}

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

const X = 1;
const JUMP = -2;

var Keyboard = (level) => {

    level.controllableEntities.forEach((e) => {
        if(keys[0]){
            e.velX = -X;
        }else if(keys[2]){
            e.velX = X;
        }
        // permit to go right or left AND jump
        if(keys[1] && e.canJump){
            e.velY += JUMP;
        }
    });
}

const FRAMERATE = 60;
const rAF = requestAnimationFrame || function(cb) { setTimeout(cb, 1 / FRAMERATE * 1000) };

var MainLoop = (level, onGameFinished, onGameOver) => {

    let lastTime;
    const loop = () => {

        if(Collision.checkGameOver(level)) {
            return onGameOver();
        }

        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000.0;

        Keyboard(level);

        // On est pas sur de cet ordre
        // TODO use delta time in update
        Physics.update(level, deltaTime);
        const gameIsWin = Collision.check(level);
        if(gameIsWin) {
            return onGameFinished();
        }
        Renderer$1.render(level);

        //Check la fin du niveau (mort ou a atteint la porte)
        //c'est une collision dans tous les cas, a voir si on la fait
        //directement dans Collision

        lastTime = now;
        rAF(loop);
    };

    Renderer$1.init(level);
    loop();

}

let levelIndex = 0;

const start = () => {
    const level = LevelDeserializer(levelIndex);
    Console(level);
    MainLoop(level, () => {levelIndex++; start();}, start);
};

start();

}());