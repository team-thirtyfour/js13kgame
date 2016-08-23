export default {
    update: (level, deltaTime) => {
        level.movableEntities.forEach((e) => {
            e.x += deltaTime * e.velX;
            e.velX = 0;
            e.y += deltaTime * e.velY;
            e.velY += level.gravity;
        });
    }
};
