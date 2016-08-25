const checkCollision = (eA, eB) => {
    return !((eA.x >= eB.x + eB.width) || (eA.x + eA.width <= eB.x) || (eA.y >= eB.y + eB.height) || (eA.y + eA.height <= eB.y));
};

const isOffScreen = (e) => {
  return e.x > 100 || e.x < 0 || e.y > 100 || e.y < 0;
};

export default {

    /**
     *
     * @param level
     * @returns {boolean} true when game is won
     */
    check: (level) => {
        let gameIsWon = false;
        const eA = level.playerEntity;
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

                gameIsWon = eB.isFinisher;
            }
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
