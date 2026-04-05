/**
 * @title TextmodeLayer.filter
 * @author codex
 */
const t = textmode.create();

// Create a layer with filters applied
const effectLayer = t.layers.add({ blendMode: 'normal', opacity: 1.0 });

t.draw(() => {
  // Base layer: draw a simple pattern
  t.background(20, 20, 40);
  t.charColor(255, 200, 100);
  t.char('#');
  t.rect(t.grid.cols, t.grid.rows);
});

effectLayer.draw(() => {
  t.clear();
  t.charColor(100, 150, 255);
  t.char('*');
  t.rect(10, 10);

  // Apply filters in sequence
  if (t.frameCount % 120 < 60) {
    effectLayer.filter('invert');
  }
  effectLayer.filter('grayscale', Math.sin(t.frameCount * 0.05) * 0.5 + 0.5);
});
