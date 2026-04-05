/**
 * @title TextmodeLayer.draw
 * @author codex
 */
const t = textmode.create();

// Create layers with different blend modes
const glowLayer = t.layers.add({ blendMode: 'additive', opacity: 0.7 });
const particleLayer = t.layers.add({ blendMode: 'screen', opacity: 0.5 });

// Base layer: animated background with subtle wave pattern
t.draw(() => {
  const time = t.frameCount * 0.02;
  t.background(8, 12, 24);

  // Draw undulating grid pattern
  for (let y = -t.grid.rows / 2; y < t.grid.rows / 2; y++) {
    for (let x = -t.grid.cols / 2; x < t.grid.cols / 2; x++) {
      const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time * 0.7);
      const brightness = 20 + wave * 15;

      t.push();
      t.charColor(brightness, brightness + 5, brightness + 15);
      t.char(wave > 0.3 ? '+' : wave > -0.3 ? '·' : '.');
      t.translate(x, y);
      t.point();
      t.pop();
    }
  }
});

// Glow layer: pulsing orbital ring
glowLayer.draw(() => {
  t.clear();
  const time = t.frameCount * 0.03;
  const ringCount = 24;

  for (let i = 0; i < ringCount; i++) {
    const angle = (i / ringCount) * Math.PI * 2 + time;
    const pulse = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5;
    const radius = 8 + Math.sin(time * 1.5) * 2;

    t.push();
    t.charColor(255, 180 + pulse * 75, 80 + pulse * 100);
    t.char('#*+=-'[i % 5]);
    t.translate(Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius * 0.6));
    t.point();
    t.pop();
  }
});

// Particle layer: floating sparkles
particleLayer.draw(() => {
  t.clear();
  const time = t.frameCount * 0.015;

  for (let i = 0; i < 12; i++) {
    const seed = i * 137.5; // Golden angle for distribution
    const x = Math.sin(seed + time) * (6 + i * 0.8);
    const y = Math.cos(seed * 1.3 + time * 0.8) * (4 + i * 0.5);
    const flicker = Math.sin(time * 4 + i) * 0.5 + 0.5;

    t.push();
    t.charColor(200 + flicker * 55, 220, 255);
    t.char('*');
    t.translate(Math.round(x), Math.round(y));
    t.point();
    t.pop();
  }
});
