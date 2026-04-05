/**
 * @title Textmodifier.background
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  // Set dynamic background
  t.background(
    127 + 127 * Math.sin(t.frameCount * 0.01),
    50,
    127 + 127 * Math.cos(t.frameCount * 0.01)
  );

  // Retrieve it to create a contrasting shape color
  const bg = t.background();
  t.charColor(255 - bg.r, 255 - bg.g, 255 - bg.b);

  t.char('☼');
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
