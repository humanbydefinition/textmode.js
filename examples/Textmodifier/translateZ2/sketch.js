/**
 * @title Textmodifier.translateZ2
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);
  t.char('O');
  t.charColor(180, 120, 255);
  t.translateZ(Math.sin(t.frameCount * 0.05) * 20); // Pulse in/out
  t.rect(12, 12);
});
