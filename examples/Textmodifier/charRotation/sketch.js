/**
 * @title Textmodifier.charRotation
 * @author codex
 */
// Rotating characters independently of geometry
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 64;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * 20;
    const y = Math.sin(angle) * 20;

    t.push();
    t.translate(x, y);

    // Rotate the character itself
    t.charRotation(t.frameCount * 5 + i * 30);

    t.charColor(255, 200, 100);
    t.char('+');
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
