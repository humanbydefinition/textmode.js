/**
 * @title TextmodeLayer.getPluginState
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const layer = t.layers.add();

// Initialize a shared state object on the layer
layer.setPluginState('anim', { angle: 0, speed: 0.05 });

layer.draw(() => {
  t.clear();

  // Retrieve the typed state
  const state = layer.getPluginState('anim');

  if (state) {
    state.angle += state.speed;

    const r = 8;
    const x = Math.cos(state.angle) * r;
    const y = Math.sin(state.angle) * r;

    t.push();
    t.translate(Math.round(x), Math.round(y));
    t.char('O');
    t.charColor(255, 200, 0);
    t.point();
    t.pop();
  }
});

t.draw(() => {
  t.background(0);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
