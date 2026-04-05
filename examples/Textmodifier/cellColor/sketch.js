/**
 * @title Textmodifier.cellColor
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  // Set cell color based on position
  const x = Math.sin(t.frameCount * 0.05) * 10;
  if (x > 0) t.cellColor(50, 0, 0);
  else t.cellColor(0, 0, 50);

  // Query the current cell color to set the character color
  const cell = t.cellColor();
  t.charColor(255 - cell.r, 255 - cell.g, 255 - cell.b);

  t.char('.');
  t.translate(x, 0);
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
