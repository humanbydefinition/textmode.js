/**
 * @title Textmodifier.char
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const chars = ['A', 'B', 'C'];
  const index = Math.floor(t.frameCount / 30) % chars.length;
  t.char(chars[index]);

  // Query the current character to decide the color
  const current = t.char();

  if (current === 'A') t.charColor(255, 100, 100);
  else if (current === 'B') t.charColor(100, 255, 100);
  else t.charColor(100, 100, 255);

  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
