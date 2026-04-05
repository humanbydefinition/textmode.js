/**
 * @title Textmodifier.point
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(10, 10, 20);

  const time = t.frameCount * 0.05;
  const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;

  // Draw a rhythmic particle trail using point()
  for (let i = 0; i < 30; i++) {
    const angle = time - i * 0.1;
    const r = radius * (0.8 + 0.4 * Math.sin(time * 0.3 + i * 0.2));
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;

    const life = 1 - i / 30;
    t.push();
    t.translate(x, y);
    t.char(['*', '·', '•', '°'][i % 4]);
    t.charColor(255 * life, 150 * life, 255);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
