/**
 * @title Textmodifier.color
 * @author codex
 */
// Dynamic color creation
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 10;
  for (let i = 0; i < count; i++) {
    // Create a reusable color for each slice
    const brightness = (i / (count - 1)) * 255;
    const col = t.color(brightness);

    t.push();
    t.translate((i - (count - 1) / 2) * 5, 0);
    t.charColor(col);
    t.char('█');
    t.rect(4, 30);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
