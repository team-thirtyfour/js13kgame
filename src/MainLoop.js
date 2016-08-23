import Physics from './Physics';
import Renderer from './Renderer';
import Collision from './Collision';
import Keyboard from './Keyboard';

const FRAMERATE = 60;
const rAF = requestAnimationFrame || function(cb) { setTimeout(cb, 1 / FRAMERATE * 1000); };

export default (level, onGameFinished, onGameOver) => {

    let lastTime = 0;
    const loop = () => {

        if(Collision.checkGameOver(level)) {
            return onGameOver();
        }

        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000.0;

        Keyboard(level);

        // On est pas sur de cet ordre
        Physics.update(level, deltaTime);
        const gameIsWin = Collision.check(level);
        if(gameIsWin) {
            return onGameFinished();
        }
        Renderer.render(level);

        //Check la fin du niveau (mort ou a atteint la porte)
        //c'est une collision dans tous les cas, a voir si on la fait
        //directement dans Collision

        lastTime = now;
        rAF(loop);
    };

    Renderer.init();
    loop();

};
