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
                    eA.velX *= eB.collisionFactorX;
                    eA.velY *= eB.collisionFactorY;
                }
            });
        });
        return collision;
    }

}
