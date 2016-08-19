export default class Level {

    constructor (entities, gravity) {
        this.entities = entities;
        this.gravity = gravity;

        this.movableEntities = this.entities.filter((e) => e.isMovable);
        this.controllableEntities = this.entities.filter((e) => e.isControllable);
    }

}
