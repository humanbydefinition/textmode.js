/**
 * @title Textmodifier.pop
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  // Draw three rotating shapes with isolated transformations and colors
  for (let i = 0; i < 3; i++) {
    t.push(); // Save state
    t.translate(i * 12 - 12, 0);
    t.rotateZ(t.frameCount * (1 + i * 0.5));
    t.charColor(100 + i * 70, 255 - i * 50, 150);
    t.char(['*', '@', '#'][i]);
    t.rect(8, 8);
    t.pop(); // Restore state - next iteration starts fresh
  }
});
