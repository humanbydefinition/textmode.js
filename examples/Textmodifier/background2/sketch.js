/**
 * @title Textmodifier.background2
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  // Pulsing grayscale background
  const gray = 127 + 127 * Math.sin(t.frameCount * 0.05);
  t.background(gray);

  t.charColor(255 - gray); // Inverse color for text
  t.cellColor(0, 0, 0, 0); // Transparent cell background
  t.char('+');
  t.rect(20, 20);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
