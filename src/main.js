import EventLoop from './EventLoop';
import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import KeyboardController from './KeyboardController';
import MainLoop from './MainLoop';

console.log('ok watch 22');
EventLoop.start();

const levelIndex = 0;

const level = LevelDeserializer(levelIndex);
Console(level);
KeyboardController(level);
MainLoop(level);
