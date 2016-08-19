import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import MainLoop from './MainLoop';

var canvasStatic = document.createElement('canvas');
canvasStatic.width = '600';
canvasStatic.height = '800';
document.getElementsByTagName('body')[0].appendChild(canvasStatic);

var canvasMovable = document.createElement('canvas');
canvasMovable.width = '600';
canvasMovable.height = '800';
document.getElementsByTagName('body')[0].appendChild(canvasMovable);

const levelIndex = 0;

const level = LevelDeserializer(levelIndex);
Console(level);
MainLoop(level, canvasMovable, canvasStatic);
