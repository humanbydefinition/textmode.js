/**
 * @title Textmodifier.cellColor2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);
  t.charColor(255);
  t.char(' ');

  // Vary cell brightness
  const brightness = 127 + 127 * Math.sin(t.frameCount * 0.1);
  t.cellColor(brightness);
  t.rect(10, 10);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
