/**
 * @title Textmodifier.arc
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

t.draw(() => {
  t.background(10, 15, 25); // Deep space blue

  const time = t.frameCount * 0.02;
  const arcCount = 32;
  const baseSize = Math.min(t.grid.cols, t.grid.rows);

  for (let i = 0; i < arcCount; i++) {
    const phase = i / arcCount;
    const size = baseSize * (0.3 + 0.7 * Math.sin(time + phase * Math.PI));
    const startAngle = (time * 50 + i * 45) % 360;
    const sweep = 45 + 90 * (0.5 + 0.5 * Math.cos(time * 0.7 + i));

    t.push();
    t.rotateZ(i * (360 / arcCount) + time * 20);

    // Color shifting
    const r = 100 + 155 * Math.sin(time + phase);
    const g = 150 + 105 * Math.cos(time * 0.5 + phase);
    const b = 200 + 55 * Math.sin(time * 0.8);

    t.charColor(r, g, b);
    t.char(['+', '•', '·', '░'][i % 4]);
    t.lineWeight(2 + i % 3);

    t.arc(size, size, startAngle, startAngle + sweep);
    t.pop();
  }

  // Center core
  t.char('@');
  t.charColor(255, 255, 200);
  t.rotateZ(-time * 100);
  t.rect(2, 2);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
