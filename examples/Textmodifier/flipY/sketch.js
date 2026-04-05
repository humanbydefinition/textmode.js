/**
 * @title Textmodifier.flipY
 * @author codex
 */
// Using flipY for vertical reflection
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0, 10, 20);

  const count = 32;
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1) - 0.5) * t.grid.cols * 0.7;
    const y = -10 + Math.sin(t.frameCount * 0.05 + i) * 2;

    // Draw original (Sky)
    t.push();
    t.translate(x, y);
    t.char('^');
    t.charColor(200, 200, 255);
    t.point();
    t.pop();

    // Draw reflected (Water)
    t.push();
    t.translate(x, -y);
    t.flipY(true);
    t.char('^');
    // Dimmer and bluer for reflection
    t.charColor(50, 100, 200, 150);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
