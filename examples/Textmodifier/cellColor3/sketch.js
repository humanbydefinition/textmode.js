/**
 * @title Textmodifier.cellColor3
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  t.charColor(0, 0, 0);
  t.char('/');

  // Cyan cell background
  t.cellColor(0, 255, 255);
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
