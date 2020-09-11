const paint = (() => {
  const Model = (() => {
    const style = {
      color: 'black',
      active: false,
      condition: 'drawing',
      lineWidth: 1,
    };

    return style;
  })();

  const canvas = document.querySelector('.paint__canvas');
  const ctx = canvas.getContext('2d');

  const View = (() => {
    const firstSetting = () => {
      canvas.width = 618;
      canvas.height = 600;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawLine = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;

      let condition = Model.condition;

      if (condition === 'drawing' && Model.active === true) {
        ctx.strokeStyle = Model.color;
        ctx.lineWidth = Model.lineWidth;

        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    };

    const paintCanvas = () => {
      let condition = Model.condition;

      if (condition === 'painting' && Model.active === true) {
        ctx.fillStyle = Model.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const activeColorChips = (e) => {
      const colorChips = document.querySelectorAll(
        '.paint__controls__colorChips__color',
      );

      colorChips.forEach((color) => {
        color.classList.remove('active');
      });

      e.target.classList.add('active');
    };

    const activeTool = (e) => {
      const tools = document.querySelectorAll('.paint__controls__tools > div');
      tools.forEach((tool) => {
        tool.classList.remove('active');
        console.log('remove');
      });
      e.target.classList.add('active');
    };

    return {
      firstSetting,
      drawLine,
      paintCanvas,
      activeColorChips,
      activeTool,
    };
  })();

  const Controller = (() => {
    const changeTool = (e) => {
      switch (e.target.dataset.name) {
        case 'pencil':
          Model.active = false;
          Model.condition = 'drawing';
          Model.lineWidth = 1;
          break;
        case 'pen':
          Model.active = false;
          Model.condition = 'drawing';
          Model.lineWidth = 3;
          break;
        case 'marker':
          Model.active = false;
          Model.condition = 'drawing';
          Model.lineWidth = 10;
          break;
        case 'paint':
          Model.condition = 'painting';
          break;
      }
      View.activeTool(e);
    };

    const changeColor = (e) => {
      const color = e.target.style.backgroundColor;
      View.activeColorChips(e);
      Model.color = color;
    };

    const tools = document.querySelectorAll('.paint__controls__tools > div');
    const colors = document.querySelectorAll(
      '.paint__controls__colorChips__color',
    );

    tools.forEach((tool) => {
      return tool.addEventListener('click', (e) => changeTool(e));
    });

    colors.forEach((color) => {
      return color.addEventListener('click', (e) => changeColor(e));
    });

    canvas.addEventListener('mousedown', () => {
      Model.active = true;
    });
    canvas.addEventListener('mouseup', () => {
      Model.active = false;
    });
    canvas.addEventListener('mousemove', function (e) {
      View.drawLine(e);
    });

    canvas.addEventListener('mouseleave', () => {
      Model.active = false;
    });

    canvas.addEventListener('click', () => {
      if (Model.condition === 'painting') {
        Model.active = true;
      }

      View.paintCanvas();
    });

    return {
      changeTool,
      changeColor,
    };
  })();

  View.firstSetting();

  if (canvas) {
    Controller;
  }
})();
