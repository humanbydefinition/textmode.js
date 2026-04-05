/**
 * @title Textmodifier.triangle
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(5, 5, 10);

  const time = t.frameCount * 0.02;
  const count = 12;
  const radius = Math.min(t.grid.cols, t.grid.rows) * 0.35;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const pulse = 0.5 + 0.5 * Math.sin(time + i * 0.5);

    // Coordinate rotation for a kaleidoscopic effect
    const x = Math.cos(angle + time * 0.5) * radius * pulse;
    const y = Math.sin(angle + time * 0.5) * radius * pulse;

    t.push();
    t.translate(x, y);
    t.rotateZ(i * 30 + time * 100);

    // Aesthetic color gradient
    t.charColor(150 + pulse * 105, 100, 255 - pulse * 100);
    t.char(['/', '\\', '|', '-'][i % 4]);
    t.lineWeight(1 + Math.floor(pulse * 3));

    const s = 4 + pulse * 8;
    t.triangle(
      0, -s,           // Top vertex
      -s, s * 0.7,     // Bottom left
      s, s * 0.7       // Bottom right
    );
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
