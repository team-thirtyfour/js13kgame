const checkCollision = (eA, eB) => {
    return !((eA.x >= eB.x + eB.width)
    || (eA.x + eA.width <= eB.x)
    || (eA.y >= eB.y + eB.height)
    || (eA.y + eA.height <= eB.y));
};

export default {

    check: (level) => {
        //TODO naive implementation == change me
        level.entities.forEach((eA) => {
            eA.canJump = false;
            level.entities.forEach((eB) => {
                if(eA !== eB && checkCollision(eA, eB)) {
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    eA.y = eB.y - eA.height;
                    if(eB.collisionFactorY < 0){
                      //This means that we can jump or bounce on the surface
                      eA.canJump = true;
                    }
                }
            });
        });
    },
    checkGameOver: (level) => {
        // when 1 controllable entity is outside of game
        return !!level.controllableEntities.find((e) => e.x > 100 || e.x < 0 || e.y > 100 || e.y < 0);
    }

}
