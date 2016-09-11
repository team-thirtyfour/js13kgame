import Level from './Level';
import Entity from './Entity';
import {FORMS} from './Renderer';

let levelIndex = 0;

const getParameterByName = (name, url) => {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export default {
    /**
     * return current level
     */
    level: () => {
        const map = getParameterByName('map');
        const gravity = getParameterByName('gravity');
        return parse(map && gravity ? [parseFloat(gravity), map] : levels[levelIndex]);
    },
    next: () => {
        if(levelIndex < levels.length - 1) {
            levelIndex++;
        } else {
            window.alert('win'); // TODO finish me
        }
    },
    previous: () => {
        if(levelIndex > 0) {
            levelIndex--;
        }
    }
};

const parse = (level) => {

    var entitiesStr = level[1].split('|');
    var entities = entitiesStr.map((e)=>{
        var str = e.split(',');
        switch(str[0]){
            case 'J':
                return Entity(+str[1], +str[2], 2, 2, 0, 0, 0, 0, FORMS.CIRCLE, 'red', true, true, false, false, true, false, false);
            case 'M':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, -0.1, FORMS.RECT, 'grey', false, false, false, false, false, false, false);
            case 'T':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, -0.5, FORMS.RECT, 'blue', false, false, false, false, false, false, false);
            case 'T_C':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0,0, -0.5, FORMS.RECT, 'violet', true, false, false, false, true, false, false);
            case 'G':
                return Entity(+str[1], +str[2], 3, 5, 0, 0, 0, 0, FORMS.RECT, 'violet', false, false, false, true, false, false, false);
            case 'F':
                return Entity(+str[1], +str[2], +str[3], +str[4], 0, 0, 0, 0, FORMS.TRIANGLE_DOWN, 'orange', false, false, true, false, false, false, false);
            case 'A':
                return Entity(+str[1], +str[2], 2, 2, 0, 0, 0, 0, FORMS.CIRCLE, 'pink', false, false, true, false, false, false, false, () => {
                    return Entity(50, 50, 0.5, 0.5, 0, 0, 0, 0, FORMS.CIRCLE, 'pink', true, false, true, false, false);
                });
        }

    });
    return Level(entities, level[0]);
};

/**
 * first number : gravity
 * J,x,y : Joueur => new Entity(x, y, 2, 2, 0, 0, 0, 0, 'circle', 'red', true, true)
 * M,x,y,w,h : Mur => new Entity(x, y, w, h, 0, 0, 0, 0, 'square', 'grey', false, false)
 * T,x,y,w,h : Trampoline => new Entity(x, y, w, h, 0, 0, 0, -0.2, 'square', 'blue', false, false)
 * G,x,y : Gate => new Entity(x, y, 3, 5, 0, 0, 0, 0, 'square', 'violet', false, false, false, true)
 * F,x,y,w,h : Fire
 * A,x,y : Amo => new Entity(x, y, 3, 5, 0, 0, 0, 0, 'circle', 'pink', false, false, true, false)
 */
const levels = [
    [1,'J,10,10|T,0,90,90,2|G,90,90|A,50,50'],
    [1,'J,10,10|T,0,50,80,2|M,50,10,2,40|G,70,45|F,10,0,20,5|F,30,0,10,8|F,40,0,5,3|F,45,0,10,3|F,55,0,10,5'],
    [1,'J,50,10|T,0,90,95,2|G,90,5|F,55,0,10,10']
];
