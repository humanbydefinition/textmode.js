/**
 * @title Textmodifier.cellColor4
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  t.char('@');

  // Use hex for cell background
  t.cellColor('#ff4400');
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
