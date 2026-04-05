/**
 * @title Textmodifier.translateY
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const yPos = Math.sin(t.frameCount * 0.03) * 15;

  t.push();
  t.translateY(yPos);

  // Visualize the Y coordinate
  const currentY = t.translateY();
  if (currentY > 0) t.char('▲');
  else t.char('▼');

  t.charColor(255, 255 - Math.abs(currentY) * 10, 100);
  t.rect(8, 8);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
