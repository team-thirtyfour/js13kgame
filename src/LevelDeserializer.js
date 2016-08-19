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
                return new Entity(parseFloat(str[1]), parseFloat(str[2]), 10, 10, 0, 0, 0, 0, 'circle', 'red', true, true);
            case 'M':
                return new Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, 0, 'square', 'grey', false, false);
            case 'T':
                return new Entity(parseFloat(str[1]), parseFloat(str[2]), parseFloat(str[3]), parseFloat(str[4]), 0, 0, 0, -0.2, 'square', 'blue', false, false);
        }

    });

    return new Level(entities, level[0]);
};

/**
 * first number : gravity
 * J,x,y : Joueur => new Entity(x, y, 10, 10, 0, 0, 0, 0, 'circle', 'red', true, true)
 * M,x,y,w,h : Mur => new Entity(x, y, w, h, 0, 0, 0, 0, 'square', 'grey', false, false)
 * T,x,y,w,h : Trampoline => new Entity(x, y, w, h, 0, 0, 0, -0.2, 'square', 'bleu', false, false)
 */
const levels = [
      //level 1
    [0.5,'J,100,10/T,0,185,500,10/M,500,0,10,185' ]
    , // level 2
    [0.5,'J,100,10/M,0,185,500,10']
];
