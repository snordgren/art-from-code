function updateCanvas() {
  const sourceCodeInput = document.getElementById('source-code-input');
  const sourceCode = sourceCodeInput.value;
  const canvasSize = 512;
  const ctx = retrieveDrawContext(canvasSize);
  evalSource(ctx, canvasSize, sourceCode);
}

function retrieveDrawContext(canvasSize) {
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = document.getElementById('editor-canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');
  return ctx;
}

function evalSource(ctx, canvasSize, src) {

  const arcTo = (x1, y1, x2, y2, radius) => {
    ctx.arcTo(x1, canvasSize - y1 - 1, x2, canvasSize - y2 - 1, radius);
  }
  
  const beginPath = () => {
    ctx.beginPath();
  }
  
  const circle = (x, y, radius) => {
    ctx.arc(x + radius / 2, canvasSize - y - radius / 2, radius / 2, radius / 2, 0, 2 * Math.PI);
  }

  const fill = () => ctx.fill();

  const fillStyle = (style) => {
    ctx.fillStyle = style;
  };

  const lineTo = (x, y) => {
    ctx.lineTo(x, canvasSize - y - 1);
  }
  
  const moveTo = (x, y) => {
    ctx.moveTo(x, canvasSize - y - 1);
  };

  const pi = Math.PI;

  const quadraticCurveTo = (cpx, cpy, x, y) => {
    ctx.quadraticCurveTo(cpx, canvasSize - cpy - 1, x, canvasSize - y - 1);
  }

  const rect = (x, y, w, h) => {
    ctx.rect(x, canvasSize - y - h, w, h);
  };

  const stroke = () => ctx.stroke();

  const strokeStyle = (style) => {
    ctx.strokeStyle = style;
  };

  const result = eval(src);
}
