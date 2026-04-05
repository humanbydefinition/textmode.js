/**
 * @title TextmodeColor.g
 * @author codex
 */
// Green channel visualization
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0, 10, 0); // Dim phosphor background

  const time = (t.frameCount * 0.05) % (Math.PI * 2);
  const radius = Math.min(t.grid.cols, t.grid.rows) * 0.4;

  // Scan the grid area
  for (let y = -radius; y < radius; y++) {
    for (let x = -radius; x < radius; x++) {
      if (x * x + y * y > radius * radius) continue;

      // Calculate angle of point relative to center
      let a = Math.atan2(y, x);
      if (a < 0) a += Math.PI * 2;

      // Calculate distance from scan line angle
      let diff = time - a;
      if (diff < 0) diff += Math.PI * 2;

      // Fade out trail
      const brightness = Math.max(0, 255 - diff * 100);

      // Blip targets
      const isTarget = (Math.abs(x - 10) < 2 && Math.abs(y + 5) < 2);
      const g = isTarget ? Math.max(brightness, 150 + Math.sin(t.frameCount*0.5)*100) : brightness;

      const col = t.color(0, g, 0);

      if (col.g > 20) {
        t.push();
        t.translate(x, y);
        t.charColor(col);
        // Use green intensity to pick character
        t.char(col.g > 180 ? '█' : col.g > 80 ? '▒' : '·');
        t.point();
        t.pop();
      }
    }
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
