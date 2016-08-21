import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import MainLoop from './MainLoop';

const levelIndex = 0;

const start = () => {
    const level = LevelDeserializer(levelIndex);
    Console(level);
    MainLoop(level, start);
};

start();
