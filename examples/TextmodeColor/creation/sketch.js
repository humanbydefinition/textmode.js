/**
 * @title TextmodeColor.creation
 * @author codex
 */
// Demonstrating color creation and manipulation
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(10, 5, 15);

  const time = t.frameCount * 0.02;
  const count = 100;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 3 + time;
    const radius = 5 + i * 0.4;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    t.push();
    t.translate(x, y);

    // Demonstrate different color creation methods based on index
    let col;
    if (i % 3 === 0) {
      // RGB: Warm colors
      col = t.color(255, i * 2, 50);
    } else if (i % 3 === 1) {
      // Hex: Teal accents
      col = t.color('#00FFCC');
    } else {
      // Grayscale: White stars
      col = t.color(255, 150);
    }

    t.charColor(col);
    t.char(i % 5 === 0 ? '+' : '#');
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
