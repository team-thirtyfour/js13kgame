const render = (ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    ctx.clearRect(0, 0, 600, 800);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(entity.x, entity.y, entity.width, entity.height);
    ctx.fillStyle = entity.color;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
};

export default {
    render: (level, canvasMovable, canvasStatic) => {
        const ctxMovable = canvasMovable.getContext('2d');
        const ctxStatic = canvasStatic.getContext('2d');
        level.entities.forEach((e) => {
            if(e.isMovable) {
                render(ctxMovable, e);
            } else {
                render(ctxStatic, e);//TODO init at start and not re-render each loop
            }
        });
    }
}
