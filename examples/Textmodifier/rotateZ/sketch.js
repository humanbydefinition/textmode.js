/**
 * @title Textmodifier.rotateZ
 * @author codex
 */
// Layered rotation and symmetry
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(10, 5, 20);

  const layers = 8;
  const time = t.frameCount;

  for (let i = 0; i < layers; i++) {
    const progress = i / layers;
    const angle = time * (1 + progress) + i * 45;

    t.push();
    // Rotate around Z axis (flat spin)
    t.rotateZ(angle);

    // Dynamic size and character
    const size = 30 - i * 3;
    t.char(['.', '=', '+', '!', '?'][i % 5]);

    // Neon color gradient
    t.charColor(255, 100 + i * 20, 200 - i * 10);

    t.rect(size, size);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
