/**
 * @title TextmodeLayer.offset
 * @author codex
 */
const t = textmode.create();

const LAYER_COUNT = 32;
const LABEL = 'textmode.js';

// Create trailing layers
const layers = Array.from({ length: LAYER_COUNT }, () =>
  t.layers.add({ blendMode: 'normal', opacity: 1.0 })
);

// Snake segments for smooth trailing effect
const segments = Array.from({ length: LAYER_COUNT + 1 }, () => ({ x: 0, y: 0 }));

// Helper to draw text label centered
const drawLabel = (color) => {
  t.charColor(...color);
  t.cellColor(0, 0, 0, 0);
  [...LABEL].forEach((char, i) => {
    t.push();
    t.char(char);
    t.translate(i - Math.floor(LABEL.length / 2), 0);
    t.rect(1, 1);
    t.pop();
  });
};

// Set up layer draw callbacks
layers.forEach((layer, index) => {
  layer.draw(() => {
    t.background(0, 0, 0, 0);
    const brightness = 255 - (index / LAYER_COUNT) * 180;
    drawLabel([brightness, brightness * 0.8, 255]);
  });
});

t.draw(() => {
  t.background(20, 20, 40);
  t.clear();

  // Compute head position (circular motion)
  const time = t.frameCount * 0.06;
  const head = {
    x: Math.cos(time) * 24,
    y: Math.sin(time * 0.7) * 12
  };

  // Update snake segments with elastic follow
  segments[0] = head;
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    segments[i].x += (prev.x - segments[i].x) * 0.3;
    segments[i].y += (prev.y - segments[i].y) * 0.3;
  }

  // Draw head on base layer
  t.layers.base.offset(Math.round(head.x), Math.round(head.y));
  drawLabel([255, 200, 100]);

  // Offset each trailing layer to its segment position
  layers.forEach((layer, index) => {
    const seg = segments[index + 1];
    layer.offset(Math.round(seg.x), Math.round(seg.y));
  });
});
