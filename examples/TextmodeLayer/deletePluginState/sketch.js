/**
 * @title TextmodeLayer.deletePluginState
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const layer = t.layers.add();

t.mousePressed(() => {
  // Reset the 'boom' state when mouse is clicked
  if (layer.hasPluginState('boom')) {
    layer.deletePluginState('boom');
  }
});

layer.draw(() => {
  t.clear();

  if (!layer.hasPluginState('boom')) {
    layer.setPluginState('boom', { frame: 0 });
  }

  const state = layer.getPluginState('boom');
  if (state) {
    state.frame++;
    const radius = state.frame;
    if (radius > 10) return; // Explosion finished

    // Draw explosion ring
    for(let i=0; i<12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.5;

      t.push();
      t.translate(Math.round(x), Math.round(y));
      t.char('*');
      t.charColor(255, 100 + radius * 10, 0);
      t.point();
      t.pop();
    }
  }
});

t.draw(() => {
  t.background(0);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
