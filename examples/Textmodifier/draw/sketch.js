/**
 * @title Textmodifier.draw
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const time = t.frameCount * 0.05;

  for (let i = 0; i < 20; i++) {
    const angle = time + i * 0.3;
    const radius = 10 + i;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    t.push();
    t.translate(x, y);
    t.rotateZ(angle);
    t.charColor(255 - i * 10, 100 + i * 5, 200);
    t.char(['+', 'x', 'o'][i % 3]);
    t.rect(2, 2);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
