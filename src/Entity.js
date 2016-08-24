export default (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isControllable, isKiller, isFinisher, childFactory) => {
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
        isKiller: isKiller,
        isFinisher: isFinisher,
        childFactory: childFactory,
        isKilled: false,
        canJump: false
    };
};
