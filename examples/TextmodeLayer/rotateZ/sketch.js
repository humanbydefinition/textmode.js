/**
 * @title TextmodeLayer.rotateZ
 * @author codex
 */
const t = textmode.create();

const rotatingLayer = t.layers.add({ blendMode: 'difference', opacity: 1.0 });

rotatingLayer.draw(() => {
  t.clear();
  t.charColor(255, 200, 100);
  t.char('#');
  t.rect(10, 5);
});

t.draw(() => {
  t.background(20, 20, 40);

  // Rotate the layer over time
  rotatingLayer.rotateZ(t.frameCount * 2);

  t.charColor(100, 200, 255);
  t.char('-');
  t.rect(t.grid.cols, t.grid.rows);
});
