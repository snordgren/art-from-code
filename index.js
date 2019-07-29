function updateCanvas() {
  const sourceCodeInput = document.getElementById('source-code-input');
  const sourceCode = sourceCodeInput.value;
  const ctx = retrieveDrawContext(512);
  evalSource(ctx, sourceCode);
}

function retrieveDrawContext(canvasSize) {
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = document.getElementById('editor-canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');
  return ctx;
}

function evalSource(ctx, src) {
  const rect = (x, y, w, h) => ctx.rect(x, y, w, h);
  const fill = () => ctx.fill();
  const stroke = () => ctx.stroke();
  const fillStyle = (style) => {
    ctx.fillStyle = style;
  };

  const result = eval(src);
}
