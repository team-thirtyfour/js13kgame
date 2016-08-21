const checkCollision = (eA, eB) => {
    return !((eA.x >= eB.x + eB.width)
    || (eA.x + eA.width <= eB.x)
    || (eA.y >= eB.y + eB.height)
    || (eA.y + eA.height <= eB.y));
};

export default {

    check: (level) => {
        //TODO naive implementation == change me
        let collision = false;
        level.entities.forEach((eA) => {
            eA.canJump = false;
            level.entities.forEach((eB) => {
                if(eA !== eB && checkCollision(eA, eB)) {
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                    //Bounce not effective
                    eA.y = eB.y - eA.height;
                    if(eA.velY < 0.02) {
                      eA.velY = 0;
                    }
                    if(eB.collisionFactorY < 0){
                      //This means that we can jump or bounce on the surface
                      eA.canJump = true;
                    }
                }
            });
        });
        return collision;
    }

}
