/**
 * @title Textmodifier.translate
 * @author codex
 */
// Rhythmic translation field
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 32;
  const time = t.frameCount * 0.05;

  for (let i = 0; i < count; i++) {
    const phase = i / count;
    const x = (phase - 0.5) * t.grid.cols * 0.8;
    const y = Math.sin(time + phase * 10) * 15;

    t.push();
    // Displace glyph in space
    t.translate(x, y, Math.cos(time + phase * 5) * 10);

    t.charColor(100, 155 + y * 5, 255);
    t.char('≈');
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
