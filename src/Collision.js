const COL_TOP = 0;
const COL_RIGHT = 1;
const COL_BOTTOM = 2;
const COL_LEFT = 3;

const checkCollision = (eA, eB) => {
    let collides = !((eA.x >= eB.x + eB.width) || (eA.x + eA.width <= eB.x) || (eA.y >= eB.y + eB.height) || (eA.y + eA.height <= eB.y));
    if(collides){
      let dLeft = Math.abs(eA.x - (eB.x + eB.width));
      let dRight = Math.abs((eA.x + eA.width) - eB.x);
      let dTop = Math.abs(eA.y - (eB.y + eB.height));
      let dBot = Math.abs((eA.y + eA.height) - eB.y);

      if(dLeft < dRight && dLeft < dTop && dLeft < dBot) {return COL_LEFT;}
      if(dRight < dTop && dRight < dBot) {return COL_RIGHT;}
      if(dTop < dBot) {return COL_TOP;}
      return COL_BOTTOM;

      /*

      let w = 0.5 * (eA.width + eB.width);
      let h = 0.5 * (eA.height + eB.height);
      let dx = (eA.x + (eA.width / 2.0)) - (eB.x + (eB.width / 2.0));
      let dy = (eA.y + (eA.height / 2.0)) - (eB.y + (eB.height / 2.0));

      let wy = w * dy;
      let hx = h * dx;

      if (wy > hx) {
        if (wy > -hx){
          return COL_TOP;
        }
        else{
          return COL_LEFT;
        }
      }
      else {
        if (wy > -hx) {
          return COL_RIGHT;
        }
        else {
          return COL_BOTTOM;
        }
      }*/
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
          if(eA.collider) {
            level.entities.forEach((eB) => {
              if(eA !== eB) {
                  let collision = checkCollision(eA, eB);
                  if(collision !== undefined){
                    if(collision === COL_BOTTOM){
                      eA.velX *= eB.collisionFactorX * Math.sign(level.gravity);
                      eA.velY *= eB.collisionFactorY * Math.sign(level.gravity);
                      eA.y = eB.y - eA.height;
                    }else if (collision === COL_TOP){
                      eA.velX *= eB.collisionFactorX * Math.sign(-level.gravity);
                      eA.velY *= eB.collisionFactorY * Math.sign(-level.gravity);
                      eA.y = eB.y + eB.height;
                    }else if (collision === COL_RIGHT){
                      eA.x = eB.x - eA.width;
                    }else if (collision === COL_LEFT){
                      eA.x = eB.x + eB.width;
                    }
                    if(eA === level.playerEntity) {

                      //This means that we can jump or bounce on the surface
                      if(collision !== COL_RIGHT && collision !== COL_LEFT && eB.collisionFactorY < 0) {
                        eA.canJump = true;
                      }

                      if(eB.isKiller) {
                          eA.isKilled = true;
                      }

                      gameIsWon = eB.isFinisher;
                    }
                  }
                }
            });
          }
        });
        return gameIsWon;
    },
    checkGameOver: (level) => {
        const e = level.playerEntity;
        return e.isKilled || isOffScreen(e);
    },
    garbageOffScreenEntities: (level) => {
      let isRemoved = false;
      for (let i = level.entities.length - 1; i > -1; i--){
        const e = level.entities[i];
        if(isOffScreen(e)){
          level.entities.splice(level.entities.indexOf(e), 1);
          isRemoved = true;
        }
      }
      return isRemoved;
    }
};
