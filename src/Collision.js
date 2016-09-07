const COL_TOP = 0;
const COL_RIGHT = 1;
const COL_BOTTOM = 2;
const COL_LEFT = 3;

const checkCollision = (eA, eB) => {
    const collides =  !((eA.x >= eB.x + eB.width) || (eA.x + eA.width <= eB.x) || (eA.y >= eB.y + eB.height) || (eA.y + eA.height <= eB.y));
    if(collides){

      if(eA.x > eB.x && eA.y > eB.y){
                  alert(eB.y + '+' + eB.height + '>' + eA.y +  '-' + eA.height);
        if(eB.y + eB.height > eA.y){
          return COL_TOP;
        }else{
          return COL_LEFT;
        }
      }else if (eA.x < eB.x && eA.y > eB.y){
          if(eB.y + eB.height  > eA.y){
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

export default {

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
                  alert(collision);
                  if(collision === COL_BOTTOM){
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y - eA.height;
                  }else if (collision === COL_TOP){
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y + eB.height;
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
