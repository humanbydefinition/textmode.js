/**
 * @title Textmodifier.translateX2
 * @author codex
 */
// Horizontal oscillation field
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0, 10, 0);

  const count = 64;
  for (let i = 0; i < count; i++) {
    t.push();
    // Vertical position
    t.translateY((i - (count - 1) / 2));

    // Oscillating horizontal position
    const x = Math.sin(t.frameCount * 0.04 + i * 0.5) * 25;
    t.translateX(x);

    t.charColor(0, 255, 100);
    t.char('█');
    t.rect(4, 2);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
