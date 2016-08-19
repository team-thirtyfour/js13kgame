import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import MainLoop from './MainLoop';
import Renderer from './Renderer';

var canvasStatic = document.createElement('canvas');
canvasStatic.width = window.innerWidth * 80 / 100;
canvasStatic.height = window.innerHeight * 80 / 100;
document.getElementsByTagName('body')[0].appendChild(canvasStatic);

var canvasMovable = document.createElement('canvas');
canvasMovable.width = window.innerWidth * 80 / 100;
canvasMovable.height = window.innerHeight * 80 / 100;
document.getElementsByTagName('body')[0].appendChild(canvasMovable);

const levelIndex = 0;

const level = LevelDeserializer(levelIndex);
Console(level);
MainLoop(level, canvasMovable, canvasStatic);

window.addEventListener('resize', () => {
  canvasStatic.width = window.innerWidth * 80 / 100;
  canvasStatic.height = window.innerHeight * 80 / 100;
  canvasMovable.width = window.innerWidth * 80 / 100;
  canvasMovable.height = window.innerHeight * 80 / 100;
  Renderer.init(level, canvasMovable, canvasStatic);
}, false);
