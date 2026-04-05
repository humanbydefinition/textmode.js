/**
 * @title Textmodifier.charColor
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  // Set a dynamic base color
  t.charColor(
    127 + 127 * Math.sin(t.frameCount * 0.05),
    127 + 127 * Math.cos(t.frameCount * 0.05),
    200
  );

  // Draw base shape
  t.char('A');
  t.rect(10, 10);

  // Query the color we just set
  const col = t.charColor();

  // Create a complementary color (inverse) for the second shape
  t.push();
  t.translate(15, 0);
  t.charColor(255 - col.r, 255 - col.g, 255 - col.b);
  t.char('B');
  t.rect(10, 10);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
