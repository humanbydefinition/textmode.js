/**
 * @title TextmodeColor.a
 * @author codex
 */
// Alpha transparency
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const time = t.frameCount * 0.05;
  const trailLen = 15;

  for (let i = 0; i < trailLen; i++) {
    // Create a fading white color
    const alpha = 255 * (1 - i / trailLen);
    const col = t.color(255, 255, 255, alpha);

    // Circular motion with lag
    const tOffset = time - i * 0.1;
    const x = Math.cos(tOffset) * 15;
    const y = Math.sin(tOffset) * 15;

    t.push();
    t.translate(x, y);
    t.char(col.a > 128 ? '@' : '.'); // Use alpha property to change char
    t.charColor(col);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
