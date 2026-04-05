/**
 * @title Textmodifier.charColor2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  // Fade character color in and out
  const alpha = 127 + 127 * Math.sin(t.frameCount * 0.1);
  t.charColor(255, alpha);
  t.char('A');
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
