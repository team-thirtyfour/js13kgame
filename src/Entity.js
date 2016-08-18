export default class Entity {

    constructor (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isControllable) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        this.collisionFactorX = collisionFactorX;
        this.collisionFactorY = collisionFactorY;
        this.forme = forme;
        this.color = color;
        this.isMovable = isMovable;
        this.isControllable = isControllable;
    }

}
