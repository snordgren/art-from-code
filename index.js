function updateCanvas() {
  const sourceCodeInput = document.getElementById('source-code-input');
  const sourceCode = sourceCodeInput.value;
  const normalizedSourceCode = normalizeSourceCode(sourceCode);
  interpret(normalizedSourceCode);
}

function normalizeSourceCode(sourceCode) {
  const trimmed = sourceCode.trim().replace('\t', ' ').replace('\r', ' ');
  let remaining = trimmed;
  while (remaining.includes('  ')) {
    remaining = remaining.replace('  ', ' ');
  }
  return remaining;
}

function interpret(sourceCode) {
  const blocks = sourceCode.split('\n\n');
  const procedures = findProcedures(blocks);

  const canvasSize = 512;
  const ctx = retrieveDrawContext(canvasSize);

  for (const block of blocks) {
    if (!block.startsWith(':')) {
      ctx.fillStyle = 'black';

      const lines = block.split('\n');
      for (const line of lines) {
        const parts = line.split(' ');
        if (parts.length > 0 && parts[0].length > 0) {
          if (parts[0] === 'rect' && parts.length === 5) {
            const transform = n => (n / 100 * canvasSize) | 0;
            const par = index => transform(parseInt(parts[index]));
            const x = par(1);
            const y = par(2);
            const w = par(3);
            const h = par(4);
            
            ctx.fillRect((x - w / 2) | 0, (canvasSize - y - h / 2) | 0, w, h);
          } else if (parts[0] === 'color' && parts.length === 2) {
            ctx.fillStyle = parts[1];
          }
        }
      }
    }
  }
}

function retrieveDrawContext(canvasSize) {
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = document.getElementById('editor-canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');
  return ctx;
}

function findProcedures(blocks) {
  const procedures = {};

  for (const block of blocks) {
    if (block.startsWith(':')) {
      const lines = block.split('\n');
      if (lines.length > 0) {
        const firstLine = lines[0].trim();
        const parts = firstLine.split(' ');
        const name = parts[0].substring(1);

        const parameters = [];
        for (let i = 1; i < parts.length; i++) {
          parameters.push(parts[i]);
        }

        const operations = [];
        for (let i = 1; i < lines.length; i++) {
          operations.push(lines[i]);
        }

        procedures[name] = {
          name,
          parameters,
          operations
        };
      }
    }
  }
}
