/**
 * @title Textmodifier.translateZ
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  t.push();
  t.translateZ(Math.sin(t.frameCount * 0.05) * 50);

  const depth = t.translateZ();

  // Fade out as it goes further back (manual fog effect)
  const alpha = 50 + (depth + 50) * 2;
  t.charColor(255, 255, 255, alpha);

  t.char('Z');
  t.rect(10, 10);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
