(function () {
'use strict';

var Level = (entities, gravity) => {
    return {
        entities: entities,
        gravity: gravity,
        movableEntities: entities.filter((e) => e.isMovable),
        playerEntity: entities.find((e) => e.isPlayer)
    };
};

var Entity = (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isPlayer, isKiller, isFinisher, collider, childFactory) => {
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
        isPlayer: isPlayer,
        isKiller: isKiller,
        isFinisher: isFinisher,
        childFactory: childFactory,
        collider: collider,
        isKilled: false,
        canJump: false
    };
};

const FORMS = {
    RECT: 0,
    CIRCLE: 1,
    TRIANGLE: 2,
    TRIANGLE_DOWN: 3
};

let needToDrawStatic = true;

const render = (canvas, ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    const relative = compute(canvas, entity);
    ctx.fillStyle = entity.color;
    ctx.beginPath();
    if(entity.forme === FORMS.RECT) {
        ctx.rect(relative.x, relative.y, relative.width, relative.height);
    } else if(entity.forme === FORMS.CIRCLE) {
        ctx.arc(relative.x+relative.width/2, relative.y+relative.height/2, relative.width/2, 0, 2*Math.PI);
    } else if(entity.forme === FORMS.TRIANGLE) {
        ctx.moveTo(relative.x+relative.width/2, relative.y);
        ctx.lineTo(relative.x+relative.width, relative.y+relative.height);
        ctx.lineTo(relative.x, relative.y+relative.height);
    } else if(entity.forme === FORMS.TRIANGLE_DOWN) {
        ctx.moveTo(relative.x, relative.y);
        ctx.lineTo(relative.x+relative.width, relative.y);
        ctx.lineTo(relative.x+relative.width/2, relative.y+relative.height);
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
    };
};

const draw = (canvas, entities) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach((e) => render(canvas, ctx, e));
};

var Renderer = {
    init: () => {
        needToDrawStatic = true;
    },
    render: (level) => {
        if(needToDrawStatic) {
            needToDrawStatic = false;
            draw(canvasStatic, level.entities.filter((e) => !e.isMovable));
        }
        draw(canvasMovable, level.entities.filter((e) => e.isMovable));
    }
};

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
    needToDrawStatic = true;
}, false);

let levelIndex = 0;

const getParameterByName = (name, url) => {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var LevelDeserializer = {
    /**
     * return current level
     */
    level: () => {
        const map = getParameterByName('map');
        const gravity = getParameterByName('gravity');
        return parse(map && gravity ? [parseFloat(gravity), map] : levels[levelIndex]);
    },
    next: () => {
        if(levelIndex < levels.length - 1) {
            levelIndex++;
        } else {
            window.alert('win'); // TODO finish me
        }
    },
    previous: () => {
        if(levelIndex > 0) {
            levelIndex--;
        }
    }
};

const parse = (level) => {

    var entitiesStr = level[1].split('|');
    var entities = entitiesStr.map((e)=>{
        var str = e.split(',');
        switch(str[0]){
            case 'J':
                return Entity(+str[1], +str[2], 2, 2, 0, 0, 0, 0, FORMS.CIRCLE, 'red', true, true, false, false, true);
            case 'M':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, -0.1, FORMS.RECT, 'grey', false, false, false, false, false);
            case 'T':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, -0.5, FORMS.RECT, 'blue', false, false, false, false, false);
            case 'T_C':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, 0, FORMS.RECT, 'violet', true, false, false, false, true);
            case 'G':
                return Entity(+str[1], +str[2], 3, 5, 0, 0, 0, 0, FORMS.RECT, 'violet', false, false, false, true, false);
            case 'F':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, 0, FORMS.TRIANGLE_DOWN, 'orange', false, false, true, false, false);
            case 'A':
                return Entity(+str[1], +str[2], 2, 2, 0, 0, 0, 0, FORMS.CIRCLE, 'pink', false, false, true, false, false, () => {
                    return Entity(50, 50, 0.5, 0.5, 0, 0, 0, 0, FORMS.CIRCLE, 'pink', true, false, true, false, false);
                });
        }

    });
    return Level(entities, level[0]);
};

/**
 * first number : gravity
 * J,x,y : Joueur => new Entity(x, y, 2, 2, 0, 0, 0, 0, 'circle', 'red', true, true)
 * M,x,y,w,h : Mur => new Entity(x, y, w, h, 0, 0, 0, 0, 'square', 'grey', false, false)
 * T,x,y,w,h : Trampoline => new Entity(x, y, w, h, 0, 0, 0, -0.2, 'square', 'blue', false, false)
 * G,x,y : Gate => new Entity(x, y, 3, 5, 0, 0, 0, 0, 'square', 'violet', false, false, false, true)
 * F,x,y,w,h : Fire
 * A,x,y : Amo => new Entity(x, y, 3, 5, 0, 0, 0, 0, 'circle', 'pink', false, false, true, false)
 */
const levels = [
    [1,'J,10,10|T,0,90,90,2|G,90,90|A,50,50'],
    [1,'J,10,10|T,0,50,80,2|M,50,10,2,40|G,70,45|F,10,0,20,5|F,30,0,10,8|F,40,0,5,3|F,45,0,10,3|F,55,0,10,5'],
    [1,'J,50,10|T,0,90,95,2|G,90,5|F,55,0,10,10']
];

var Console = (level) => {

	let gravity = parseFloat(document.getElementById('gravityInput').value);
	if(!isNaN(gravity)){
		level.gravity = gravity;
	}

};

var Physics = {
    update: (level, deltaTime) => {
        level.movableEntities.forEach((e) => {
            e.x += deltaTime * e.velX;
            e.velX = 0;
            e.y += deltaTime * e.velY;
            e.velY += level.gravity;
        });
    }
};

const COL_TOP = 0;
const COL_RIGHT = 1;
const COL_BOTTOM = 2;
const COL_LEFT = 3;

const checkCollision = (eA, eB) => {
    const collides =  !((eA.x >= eB.x + eB.width) || (eA.x + eA.width <= eB.x) || (eA.y >= eB.y + eB.height) || (eA.y + eA.height <= eB.y));
    if(collides){

      if(eA.x > eB.x && eA.y > eB.y){
        if(eB.y > eA.y - eA.height){
          return COL_TOP;
        }else{
          return COL_LEFT;
        }
      }else if (eA.x < eB.x && eA.y > eB.y){
          if(eB.y > eA.y - eA.height){
            return COL_TOP;
          }else{
            return COL_RIGHT;
          }
      }else if (eA.x < eB.x && eA.y < eB.y){
        if(eB.y < eA.y + eA.height){
          return COL_BOTTOM;
        }else{
          return COL_RIGHT;
        }
      }else{
        if(eB.y < eA.y + eA.height){
          return COL_BOTTOM;
        }else{
          return COL_LEFT;
        }
      }
    }
    return undefined;
};

const isOffScreen = (e) => {
  return e.x > 100 || e.x < 0 || e.y > 100 || e.y < 0;
};

var Collision = {

    /**
     *
     * @param level
     * @returns {boolean} true when game is won
     */
    check: (level) => {
        let gameIsWon = false;
        level.playerEntity.canJump = false;
        level.entities.forEach((eA) => {
          level.entities.forEach((eB) => {
            if(eA !== eB) {
              if(eA.collider) {
                const collision = checkCollision(eA, eB);
                if(collision !== undefined){
                  if(collision === COL_BOTTOM){
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y - eA.height;
                  }else if (collision === COL_TOP){
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y + eA.height;
                  }else if (collision === COL_RIGHT){
                    eA.x = eB.x - eA.width;
                  }else if (collision === COL_LEFT){
                    eA.x = eB.x + eB.width;
                  }
                  if(eA === level.playerEntity) {

                    //This means that we can jump or bounce on the surface
                    if(eB.collisionFactorY < 0) {
                      eA.canJump = true;
                    }

                    if(eB.isKiller) {
                        eA.isKilled = true;
                    }

                    gameIsWon = eB.isFinisher;
                  }
                }
              }
            }
          });
        });
        return gameIsWon;
    },
    checkGameOver: (level) => {
        const e = level.playerEntity;
        return e.isKilled || isOffScreen(e);
    },
    garbageOffScreenEntities: (level) => {
      for (let i = level.entities.length - 1; i > -1; i--){
        const e = level.entities[i];
        if(isOffScreen(e)){
          level.entities.splice(level.entities.indexOf(e), 1);
        }
      }
    }
};

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

const X = 50;
const JUMP = -50;

var Keyboard = (level) => {

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
};

const FRAMERATE = 60;
const rAF = requestAnimationFrame || function(cb) { setTimeout(cb, 1 / FRAMERATE * 1000); };

let nbLoop = 0;

var MainLoop = (level, onGameFinished, onGameOver) => {

    let lastTime = 0;
    const loop = () => {
        nbLoop++;

        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000.0;

        Collision.garbageOffScreenEntities(level);

        Keyboard(level);
        Console(level);

        if(Collision.checkGameOver(level) && lastTime > 0) {
          return onGameOver();
        }

        // On est pas sur de cet ordre
        Physics.update(level, deltaTime);


        const gameIsWin = Collision.check(level);
        if(gameIsWin) {
            return onGameFinished();
        }
        if(nbLoop % 25 === 0) {
            level.entities
                .filter((e) => e.childFactory !== undefined)
                .forEach((e) => {
                    const childEntity = e.childFactory();
                    level.entities.push(childEntity);
                    level.movableEntities.push(childEntity);
                });
        }

        Renderer.render(level);

        //Check la fin du niveau (mort ou a atteint la porte)
        //c'est une collision dans tous les cas, a voir si on la fait
        //directement dans Collision

        lastTime = now;
        rAF(loop);
    };

    Renderer.init();
    loop();

};

const win = () => {
    LevelDeserializer.next();
    start();
};

const loose = () => {
    LevelDeserializer.previous();
    start();
};

const start = () => {
    const level = LevelDeserializer.level();
    Console(level);
    MainLoop(level, win, loose);
};

start();

}());