export default (entities, gravity) => {
    return {
        entities: entities,
        gravity: gravity,
        movableEntities: entities.filter((e) => e.isMovable),
        playerEntity: entities.find((e) => e.isPlayer),
        selectableEntity: entities.filter((e) => e.inConsole),
        pause: false
    };
};
