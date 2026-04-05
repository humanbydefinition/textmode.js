/**
 * @title Textmodifier.charColor3
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  // Cycle through colors
  t.charColor(
    Math.sin(t.frameCount * 0.05) * 127 + 128,
    Math.sin(t.frameCount * 0.05 + 2) * 127 + 128,
    Math.sin(t.frameCount * 0.05 + 4) * 127 + 128
  );
  t.char('=');
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
