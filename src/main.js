import LevelDeserializer from './LevelDeserializer';
import Console from './Console';
import MainLoop from './MainLoop';

let levelIndex = 0;

const start = () => {
    const level = LevelDeserializer(levelIndex);
    Console(level);
    MainLoop(level, () => {levelIndex++; start();}, start);
};

start();
