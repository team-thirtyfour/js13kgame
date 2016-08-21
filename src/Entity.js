export default (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isControllable) => {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        velX: velX,
        velY: velY,
        collisionFactorX: collisionFactorX,
        collisionFactorY: collisionFactorY,
        forme: forme,
        color: color,
        isMovable: isMovable,
        isControllable: isControllable,

        canJump: false
    };
}
