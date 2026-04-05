/**
 * @title Textmodifier.translateX
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  t.push();
  // Move based on sine wave
  t.translateX(Math.sin(t.frameCount * 0.05) * 20);

  // Use the actual position to determine rotation speed
  const x = t.translateX();
  t.rotateZ(t.frameCount + x);

  t.charColor(150 + x * 5, 200, 255);
  t.char('X');
  t.rect(10, 10);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
