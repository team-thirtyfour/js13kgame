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
            level.entities.forEach((eB) => {
                if(eA !== eB && checkCollision(eA, eB)) {
                    //TODO not working
                    eA.velX = eA.velX + (eA.velX * eB.collisionFactorX);
                    eA.velY = eA.velY + (eA.velY * eB.collisionFactorY);
                    eB.velX = eB.velX + (eB.velX * eA.collisionFactorX);
                    eB.velY = eB.velY + (eB.velY * eA.collisionFactorY);
                }
            });
        });
        return collision;
    }

}
