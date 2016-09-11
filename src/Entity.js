export default (x, y, width, height, velX, velY, collisionFactorX, collisionFactorY, forme, color, isMovable, isPlayer, isKiller, isFinisher, collider, inConsole, isSelected, childFactory) => {
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
        isPlayer: isPlayer,
        isKiller: isKiller,
        isFinisher: isFinisher,
        childFactory: childFactory,
        collider: collider,
        inConsole: inConsole,
        isSelected: isSelected,
        isKilled: false,
        canJump: false
    };
};
