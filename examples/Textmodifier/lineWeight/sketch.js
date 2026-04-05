/**
 * @title Textmodifier.lineWeight
 * @author codex
 */
// Dynamic line thickness
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background('#050810');

  const layers = 6;
  const spacing = 4;

  for (let i = 0; i < layers; i++) {
    const phase = t.frameCount * 0.03 + i * 0.8;
    const pulse = 1 + 4 * (0.5 + 0.5 * Math.sin(phase));
    const wobble = Math.sin(phase * 1.6) * 5;

    t.lineWeight(Math.round(pulse));
    t.charColor(160 + i * 12, 200, 255);
    t.char(['-', '+', '×'][i % 3]);

    const y = (i - (layers - 1) / 2) * spacing;
    t.line(-20, y + wobble, 20, y - wobble);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
