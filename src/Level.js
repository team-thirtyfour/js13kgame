export default (entities, gravity) => {
    return {
        entities: entities,
        gravity: gravity,
        movableEntities: entities.filter((e) => e.isMovable),
        controllableEntities: entities.filter((e) => e.isControllable)
    };
}
