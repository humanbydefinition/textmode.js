/**
 * @title Textmodifier.rotate
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600 });

t.draw(() => {
  t.background(0);

  // Draw three rectangles rotating in 3D space with different axes
  for (let i = 0; i < 3; i++) {
    t.push();
    t.translate(i * 15 - 15, 0, 0);

    const angle = t.frameCount * (1.5 + i * 0.5);
    // Each shape rotates around different combinations of axes
    t.rotate(angle * 0.7, angle * 0.5, angle);

    t.char(['T', 'X', 'T'][i]);
    t.charColor(100 + i * 60, 200 - i * 40, 255);
    t.rect(10, 10);
    t.pop();
  }
});
