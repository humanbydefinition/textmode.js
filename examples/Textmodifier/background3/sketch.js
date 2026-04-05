/**
 * @title Textmodifier.background3
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  // Colorful background based on time
  t.background(
    100 + 100 * Math.sin(t.frameCount * 0.03),
    100 + 100 * Math.sin(t.frameCount * 0.04),
    100 + 100 * Math.sin(t.frameCount * 0.05)
  );

  t.char('B');
  t.charColor(255);
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
