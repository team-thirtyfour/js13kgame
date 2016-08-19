const render = (canvas, ctx, entity) => {
    //TODO simple implementation, change me with entity form and color
    const relative = compute(canvas, entity);
    ctx.beginPath();
    ctx.rect(relative.x, relative.y, relative.width, relative.height);
    ctx.fillStyle = entity.color;
    ctx.fill();
    ctx.closePath();
};

const compute = (canvas, entity) => {
  return {
    x: entity.x * canvas.width / 100,
    y: entity.y * canvas.height / 100,
    width: entity.width * canvas.width / 100,
    height: entity.height * canvas.height / 100,
  }
}

export default {

    init: (level, canvasMovable, canvasStatic) => {
      const ctxMovable = canvasMovable.getContext('2d');
      const ctxStatic = canvasStatic.getContext('2d');
      ctxMovable.clearRect(0, 0, canvasMovable.width, canvasMovable.height);
      ctxStatic.clearRect(0, 0, canvasMovable.width, canvasMovable.height);
      level.entities.forEach((e) => {
          if(e.isMovable) {
              render(canvasMovable, ctxMovable, e);
          } else {
              render(canvasStatic, ctxStatic, e);
          }
      });
    },

    render: (level, canvasMovable, canvasStatic) => {
        const ctxMovable = canvasMovable.getContext('2d');
        ctxMovable.clearRect(0, 0, canvasMovable.width, canvasMovable.height);
        level.entities.forEach((e) => {
            if(e.isMovable) {
                render(canvasMovable, ctxMovable, e);
            }
        });
    }
}
