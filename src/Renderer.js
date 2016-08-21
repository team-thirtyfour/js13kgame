export const FORME_RECT = 0;
export const FORME_CIRCLE = 1;
export const FORME_TRIANGLE = 2;

const render = (canvas, ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    const relative = compute(canvas, entity);
    ctx.fillStyle = entity.color;
    ctx.beginPath();
    if(entity.forme === FORME_RECT) {
        ctx.rect(relative.x, relative.y, relative.width, relative.height);
    } else if(entity.forme === FORME_CIRCLE) {
        ctx.arc(relative.x+relative.width/2, relative.y+relative.height/2, relative.width/2, 0, 2*Math.PI);
    } else if(entity.forme === FORME_TRIANGLE) {
        ctx.moveTo(relative.x+relative.width/2, relative.y);
        ctx.lineTo(relative.x+relative.width, relative.y+relative.height);
        ctx.lineTo(relative.x, relative.y+relative.height)
    }
    ctx.closePath();
    ctx.fill();
};

const compute = (canvas, entity) => {
    return {
        x: entity.x * canvas.width / 100,
        y: entity.y * canvas.height / 100,
        width: entity.width * canvas.width / 100,
        height: entity.height * canvas.height / 100
    }
};

const draw = (canvas, entities) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach((e) => render(canvas, ctx, e));
};

export default {

    init: (level) => {
        draw(canvasMovable, level.entities.filter((e) => e.isMovable));
        draw(canvasStatic, level.entities.filter((e) => !e.isMovable));
    },

    render: (level) => {
        draw(canvasMovable, level.entities.filter((e) => e.isMovable));
    }
}

var canvasStatic = document.createElement('canvas');
canvasStatic.width = window.innerWidth * 0.8;
canvasStatic.height = window.innerHeight * 0.8;
document.getElementsByTagName('body')[0].appendChild(canvasStatic);

var canvasMovable = document.createElement('canvas');
canvasMovable.width = window.innerWidth * 0.8;
canvasMovable.height = window.innerHeight * 0.8;
document.getElementsByTagName('body')[0].appendChild(canvasMovable);

window.addEventListener('resize', () => {
    canvasStatic.width = window.innerWidth * 0.8;
    canvasStatic.height = window.innerHeight * 0.8;
    canvasMovable.width = window.innerWidth * 0.8;
    canvasMovable.height = window.innerHeight * 0.8;
    Renderer.init(level, canvasMovable, canvasStatic);
}, false);