/**
 * @title Textmodifier.bezierCurve
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(5, 5, 10);

  const time = t.frameCount * 0.015;
  const petals = 8;
  const size = Math.min(t.grid.cols, t.grid.rows) * 0.35;

  t.lineWeight(1);

  for (let i = 0; i < petals; i++) {
    t.push();
    const angle = (i / petals) * 360 + t.frameCount * 0.2;
    t.rotateZ(angle);

    // Dynamic control points based on time
    const cp1 = size * (0.5 + 0.3 * Math.sin(time + i));
    const cp2 = size * (0.5 + 0.3 * Math.cos(time + i * 0.5));

    // Ethereal colors
    t.charColor(100 + 100 * Math.sin(time + i), 100, 255);
    t.char(['~', '≈', '∫'][i % 3]);

    t.bezierCurve(
      0, 0,            // Anchor 1
      cp1, -cp2,       // Control 1
      cp1, cp2,        // Control 2
      size, 0          // Anchor 2
    );
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
