import Physics from './Physics';
import Renderer from './Renderer';
import Collision from './Collision';

const FRAMERATE = 60;

export default (level, canvasMovable, canvasStatic) => {

  const loop = () => {

    // On est pas sur de cet ordre
    Physics.update(level);
    Renderer.render(level, canvasMovable, canvasStatic);
    Collision.check(level);

    //Check la fin du niveau (mort ou a atteint la porte)
    //c'est une collision dans tous les cas, a voir si on la fait
    //directement dans Collision

    setTimeout(loop, 1 / FRAMERATE * 1000);
  };

  loop();  
}
