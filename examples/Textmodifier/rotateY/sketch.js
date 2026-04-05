/**
 * @title Textmodifier.rotateY
 * @author codex
 */
// A vertical stack of spinning glyphs
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const count = 15;
  const spacing = 4;

  for (let i = 0; i < count; i++) {
    const phase = i / count;
    const angle = t.frameCount * 3 + i * 20;

    t.push();
    // Stack vertically
    t.translate(0, (i - (count - 1) / 2) * spacing);

    // Rotate around Y axis (vertical spin)
    t.rotateY(angle);

    // Dynamic character selection based on "side" of rotation
    const side = Math.cos(angle * Math.PI / 180);
    t.char(side > 0 ? '▓' : '░');

    // Cyberpunk color palette
    t.charColor(100, 255, 200);
    if (Math.abs(side) < 0.2) t.charColor(255, 255, 255); // Flash on edge

    t.rect(20, 3);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
