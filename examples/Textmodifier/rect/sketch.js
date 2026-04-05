/**
 * @title Textmodifier.rect
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const time = t.frameCount * 0.5;
  const squareCount = 64;
  const maxSize = Math.max(t.grid.cols, t.grid.rows) * 1.5;

  // Draw squares from back to front for a depth effect
  for (let i = squareCount; i > 0; i--) {
    const progress = i / squareCount;
    const size = maxSize * Math.pow(progress, 1.5);
    const rotation = time + i * 15;

    t.push();
    t.rotateZ(rotation);

    // Dynamic coloring based on "depth"
    const brightness = Math.round(255 * (1 - progress));
    t.charColor(brightness, Math.round(brightness * 0.5), 255);
    t.char(['░', '▒', '▓', '█'][i % 4]);

    t.rect(size, size);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
