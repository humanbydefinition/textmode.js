/**
 * @title Textmodifier.rotateX
 * @author codex
 */
// A field of oscillating slabs
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0);

  const cols = 5;
  const rows = 5;
  const spacing = 12;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      t.push();
      // Position in grid
      t.translate((x - (cols - 1) / 2) * spacing, (y - (rows - 1) / 2) * spacing);

      // Rotation with phase shift based on position
      const angle = t.frameCount * 4 + (x + y) * 20;
      t.rotateX(angle);

      // Aesthetic coloring based on rotation phase
      const intensity = Math.sin(angle * Math.PI / 180);
      const brightness = 127 + 127 * intensity;

      t.charColor(brightness, 150, 255 - brightness);
      t.char(Math.abs(intensity) > 0.5 ? '█' : '▒');

      t.rect(10, 8);
      t.pop();
    }
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
