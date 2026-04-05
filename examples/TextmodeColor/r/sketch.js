/**
 * @title TextmodeColor.r
 * @author codex
 */
// Visualizing the red component
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const cols = 20;
  const step = t.grid.cols / cols;

  for (let i = 0; i < cols; i++) {
    // Create a dynamic color
    const r = (Math.sin(t.frameCount * 0.05 + i * 0.5) * 0.5 + 0.5) * 255;
    const col = t.color(r, 0, 0);

    t.push();
    t.translate((i - cols / 2) * step + step / 2, 0);

    // Use the red component property to drive height
    const height = (col.r / 255) * t.grid.rows * 0.8;

    t.charColor(col);
    t.char('|');
    t.rect(step - 1, height);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
