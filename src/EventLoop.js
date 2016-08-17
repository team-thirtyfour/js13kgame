import {Keyboard, KeyboardCsts} from './Keyboard';

//Will be the final 'FPS'
const REFRESH_RATE = 60;

export default class EventLoop {

    static start() {
        EventLoop.loop();
    }

    static loop() {
      setTimeout(EventLoop.loop, (1 / REFRESH_RATE) * 1000);
    }

}
