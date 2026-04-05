/**
 * @title TextmodeLayer.grid
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 32 });
const rainLayer = t.layers.add({ fontSize: 16, blendMode: 'screen' });

t.draw(() => {
  // Base Layer: The "Construct" (Low Res, Abstract)
  t.background(0);
  const time = t.frameCount * 0.02;

  // Rotating abstract structure
  const points = [[-1,-1], [1,-1], [1,1], [-1,1]];
  points.forEach(([px, py]) => {
     const rotX = px * Math.cos(time) - py * Math.sin(time);
     const rotY = px * Math.sin(time) + py * Math.cos(time);
     t.push();
     t.translate(rotX * 6, rotY * 6);
     t.char('■');
     t.charColor(40);
     t.point();
     t.pop();
  });
});

rainLayer.draw(() => {
  t.clear();
  const g = rainLayer.grid; // Access layer-specific grid

  // Digital Rain Effect on the high-res layer grid
  // We loop using the layer's grid dimensions (g.cols), not the global t.grid
  for (let x = -g.cols/2; x < g.cols/2; x+=2) {
     // Deterministic randomness for rain columns
     const speed = 0.5 + Math.abs(Math.sin(x * 132.1)) * 0.5;
     const offset = Math.abs(Math.cos(x * 54.3)) * g.rows;
     const y = Math.floor(((t.frameCount * speed + offset) % g.rows) - g.rows/2);

     t.push();
     t.translate(x, y);

     // Head of the drop
     t.char(String.fromCharCode(0x30A0 + Math.random() * 96));
     t.charColor(150, 255, 200);
     t.point();

     // Trail
     for(let j=1; j<5; j++) {
        t.translate(0, -1);
        t.charColor(0, 255 - j*50, 100 - j*20);
        t.char(j % 2 ? ':' : '.');
        t.point();
     }
     t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
