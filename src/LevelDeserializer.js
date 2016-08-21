import Level from './Level';
import Entity from './Entity';


export default (levelIndex) => {
    return parse(levels[levelIndex]); // should be a Level
}

const parse = (level) => {

    var entitiesStr = level[1].split('/');
    var entities = entitiesStr.map((e)=>{
        var str = e.split(',');
        switch(str[0]){
            case 'J':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), 2, 2, 0, 0, 0, 0, 'circle', 'red', true, true);
            case 'M':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, 0, 'square', 'grey', false, false);
            case 'T':
                return Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, -0.2, 'square', 'blue', false, false);
        }

    });

    return Level(entities, level[0]);
};

/**
 * first number : gravity
 * J,x,y : Joueur => new Entity(x, y, 2, 2, 0, 0, 0, 0, 'circle', 'red', true, true)
 * M,x,y,w,h : Mur => new Entity(x, y, w, h, 0, 0, 0, 0, 'square', 'grey', false, false)
 * T,x,y,w,h : Trampoline => new Entity(x, y, w, h, 0, 0, 0, -0.2, 'square', 'bleu', false, false)
 */
const levels = [
      //level 1
    [0.05,'J,10,10/T,0,50,80,2/M,50,0,2,50' ]
    , // level 2
    [0.05,'J,50,10/M,0,90,95,2']
];
