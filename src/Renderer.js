export const FORMS = {
    RECT: 0,
    CIRCLE: 1,
    TRIANGLE: 2
};

const formsFunc = {
    0: (c, r) => c.rect(r.x, r.y, r.width, r.height),
    1: (c, r) => c.arc(r.x + r.width / 2, r.y + r.height / 2, r.width / 2, 0, 2 * Math.PI),
    2: (c, r) => {
        c.moveTo(r.x + r.width / 2, r.y);
        c.lineTo(r.x + r.width, r.y + r.height);
        c.lineTo(r.x, r.y + r.height)
    }
};

const render = (canvas, ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    const relative = compute(canvas, entity);
    ctx.fillStyle = entity.color;
    ctx.beginPath();
    formsFunc[entity.forme](ctx, relative);
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

const init = (level) => {
    draw(canvasMovable, level.entities.filter((e) => e.isMovable));
    draw(canvasStatic, level.entities.filter((e) => !e.isMovable));
};

export default {
    init: init,
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
    init(level, canvasMovable, canvasStatic);
}, false);