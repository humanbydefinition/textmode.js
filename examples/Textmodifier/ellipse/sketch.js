/**
 * @title Textmodifier.ellipse
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

t.draw(() => {
  t.background(5, 5, 15);

  const time = t.frameCount * 0.02;
  const orbitCount = 12;
  const baseSize = Math.min(t.grid.cols, t.grid.rows);

  // Draw a series of harmonically rotating orbital rings
  for (let i = 0; i < orbitCount; i++) {
    const phase = i / orbitCount;

    t.push();
    // Complex 3D rotation based on index and time
    t.rotateX(time * 23 + i * 15);
    t.rotateY(time * 31 + i * 25);
    t.rotateZ(time * 17 + i * 35);

    // Color shifts through a cool-to-warm spectrum
    t.charColor(150 + 105 * Math.sin(time + phase * 6), 100, 255);

    // Select character based on "depth" or index for texture variety
    t.char(['░', '▒', '▓', '█', '•', '·'][i % 6]);
    t.lineWeight(1 + (i % 3));

    const s = baseSize * (0.4 + 0.6 * Math.sin(time * 0.5 + phase * Math.PI));
    t.ellipse(s, s * 0.7);
    t.pop();
  }

  // Pulsing central star
  t.push();
  t.char('☼');
  t.charColor(255, 255, 200);
  t.rotateZ(-time * 100);
  const pulse = 2 + Math.sin(time * 8) * 0.5;
  t.ellipse(pulse, pulse);
  t.pop();
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
