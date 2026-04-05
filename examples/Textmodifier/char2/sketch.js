/**
 * @title Textmodifier.char2
 * @author codex
 */
// Swapping characters over time
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  // Cycle through character indices
  const charIndex = Math.floor(t.frameCount / 10) % t.font.characters.length;
  t.char(charIndex);

  t.charColor(0, 255, 150);
  t.rotateZ(t.frameCount * 2);
  t.rect(15, 15);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
