/**
 * @title Textmodifier.flipX
 * @author codex
 */
// Using flipX for symmetry
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 10;
  for (let i = 0; i < count; i++) {
    const phase = i / count;
    const y = (phase - 0.5) * t.grid.rows * 0.8;
    const x = Math.sin(t.frameCount * 0.05 + i) * 10;

    // Draw original
    t.push();
    t.translate(x, y);
    t.char('R');
    t.charColor(255);
    t.point();
    t.pop();

    // Draw mirrored
    t.push();
    t.translate(-x, y);
    t.flipX(true);
    t.char('R');
    t.charColor(255, 100, 100);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
