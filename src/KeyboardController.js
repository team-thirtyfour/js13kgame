import Keyboard from './Keyboard';

const X = 20;
const JUMP = -10;

export default (level) => {

    Keyboard.onLeft(() => {
        console.log('left');
        level.controllableEntities.forEach((e) => e.velX = -X)
    });
    Keyboard.onRight(() => level.controllableEntities.forEach((e) => e.velX = X));
    Keyboard.onUp(() => level.controllableEntities.forEach((e) => e.velY += JUMP));

}
