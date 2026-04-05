/**
 * @title Textmodifier.invert
 * @author codex
 */
// Swapping foreground and background
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 15;
  for (let i = 0; i < count; i++) {
    t.push();
    t.translate((i - (count - 1) / 2) * 6, 0);

    // Toggle inversion based on position and time
    const shouldInvert = (i + Math.floor(t.frameCount / 30)) % 2 === 0;
    t.invert(shouldInvert);

    t.charColor(255, 100, 100);
    t.cellColor(0, 50, 100);
    t.char('█');
    t.rect(5, 20);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
