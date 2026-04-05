/**
 * @title Textmodifier.charColor4
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  // Use hex color
  t.charColor('#FFD700'); // Gold
  t.char('$');
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
