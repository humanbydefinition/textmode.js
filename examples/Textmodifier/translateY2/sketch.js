/**
 * @title Textmodifier.translateY2
 * @author codex
 */
// Cascading vertical motion
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0, 0, 10);

  const drops = 128;
  for (let i = 0; i < drops; i++) {
    t.push();
    // Horizontal position
    t.translateX((i - (drops - 1) / 2) * 8);

    // Vertical fall with wrapping
    const speed = 1 + (i % 3) * 0.5;
    const y = (t.frameCount * speed + i * 20) % (t.grid.rows + 10) - (t.grid.rows + 10) / 2;
    t.translateY(y);

    t.charColor(100, 200, 255);
    t.char('|');
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
