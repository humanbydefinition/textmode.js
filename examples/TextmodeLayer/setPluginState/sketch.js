/**
 * @title TextmodeLayer.setPluginState
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const layers = [];

t.setup(() => {
  // Create layers with independent state
  for(let i=0; i<64; i++) {
    const layer = t.layers.add();

    // Store physics state directly on the layer
    layer.setPluginState('my-physics', {
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: t.color(Math.random()*255, 200, 255)
    });

    layer.draw(() => {
    t.clear();

    // Retrieve state
    const state = layer.getPluginState('my-physics');

    // Update physics
    state.x += state.vx;
    state.y += state.vy;

    // Bounce off edges
    if (Math.abs(state.x) > t.grid.cols/2) state.vx *= -1;
    if (Math.abs(state.y) > t.grid.rows/2) state.vy *= -1;

    t.push();
    t.translate(state.x, state.y);
    t.char('O');
    t.charColor(state.color);
    t.point();
    t.pop();
  });
  }
});

t.draw(() => {
  t.background(0);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
