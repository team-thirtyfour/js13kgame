const GRAVITY = 1;

export default {
    update: (level) => {
        level.movableEntities.forEach((e) => {
            e.x += e.velX;
            e.velX = 0;
            e.y += e.velY;
            e.velY += level.gravity || GRAVITY;
        });
    }
}

