/**
 * @title Textmodifier.clear
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  // Clear the canvas fully at the start of each frame
  // This prevents "trails" from previous frames
  t.clear();

  t.background(0);

  const x = Math.sin(t.frameCount * 0.05) * 20;
  t.push();
  t.translate(x, 0);
  t.charColor(255);
  t.char('X');
  t.rect(5, 5);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
