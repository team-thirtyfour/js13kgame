import Level from './Level';
import Entity from './Entity';

const levels = ["_:2.10...", "/:2.4..."]; // should be serialized levels array (TODO)

export default (levelIndex) => {
    return parse(levels[levelIndex]); // should be a Level
}

const parse = (levelStr) => {
    //TODO
    const player = new Entity(100, 10, 10, 10, 0, 0, 0, 0, 'circle', 'red', true, true);
    const ground = new Entity(0, 185, 500, 10, 0, 0, 0, 2, 'square', 'blue', false, false);
    return new Level([player, ground], 1);
};
