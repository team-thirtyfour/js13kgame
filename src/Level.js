export default (entities, gravity) => {
    return {
        entities: entities,
        gravity: gravity,
        movableEntities: entities.filter((e) => e.isMovable),
        playerEntity: entities.find((e) => e.isPlayer),
        pause: false
    };
};
