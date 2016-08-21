import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import MainLoop from './MainLoop';

const win = () => {
    LevelDeserializer.next();
    start();
};

const loose = () => {
    LevelDeserializer.previous();
    start();
};

const start = () => {
    const level = LevelDeserializer.level();
    Console(level);
    MainLoop(level, win, loose);
};

start();
