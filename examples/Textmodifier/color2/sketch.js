/**
 * @title Textmodifier.color2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

// Create reusable colors
const red = t.color(255, 50, 50);
const blue = t.color(50, 100, 255);
// Semi-transparent yellow
const yellow = t.color(255, 255, 0, 150);

t.draw(() => {
  t.background(20);

  // Draw overlapping circles to show mixing
  const x = Math.sin(t.frameCount * 0.05) * 10;

  t.char('O');

  t.push();
  t.translate(-8 + x, 0);
  t.charColor(red);
  t.ellipse(16, 16);
  t.pop();

  t.push();
  t.translate(8 - x, 0);
  t.charColor(blue);
  t.ellipse(16, 16);
  t.pop();

  // Center shape
  t.charColor(yellow);
  t.ellipse(12, 12);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
