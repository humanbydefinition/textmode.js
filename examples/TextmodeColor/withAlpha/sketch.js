/**
 * @title TextmodeColor.withAlpha
 * @author codex
 */
// Modifying alpha of a base color
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const base = t.color(50, 150, 255);

  // Draw overlapping plates with varying opacity
  for (let i = 0; i < 5; i++) {
    t.push();
    t.translate((i - 2) * 5, Math.sin(t.frameCount * 0.05 + i) * 5);

    // Create a variation of the base color
    const opacity = 100 + i * 30;
    t.charColor(base.withAlpha(opacity));

    t.char(String.fromCharCode(65 + i));
    t.rect(12, 12);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
