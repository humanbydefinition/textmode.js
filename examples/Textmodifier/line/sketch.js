/**
 * @title Textmodifier.line
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(10, 10, 20);

  const time = t.frameCount * 0.01;
  const lineCount = 24;
  const radius = Math.min(t.grid.cols, t.grid.rows) * 0.4;

  t.lineWeight(2);

  // Spinning web of lines
  for (let i = 0; i < lineCount; i++) {
    const phase1 = (i / lineCount) * Math.PI * 2;
    const phase2 = phase1 + Math.PI + Math.sin(time) * Math.PI;

    // Points on two different rotating circles
    const x1 = Math.cos(phase1 + time) * radius;
    const y1 = Math.sin(phase1 * 2 + time * 1.5) * radius * 0.5;

    const x2 = Math.cos(phase2 - time * 0.7) * radius * 0.8;
    const y2 = Math.sin(phase2 * 1.5 - time) * radius;

    // Emergent color based on line index
    const r = 127 + 127 * Math.sin(phase1 + time);
    const g = 127 + 127 * Math.cos(phase1 * 0.5 + time);
    t.charColor(r, g, 255);

    t.char(['+', '-', '|', '/'][i % 4]);

    t.line(x1, y1, x2, y2);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
