/**
 * @title TextmodeLayer.fontSize
 * @author codex
 */
const t = textmode.create({ width: 800, height: 600, fontSize: 16 });

// Add a high-resolution layer (small font) for details
const detailLayer = t.layers.add({ fontSize: 8 });

t.draw(() => {
  t.background(0);
  t.charColor(100);
  t.char('X');
  t.rect(10, 10);
});

detailLayer.draw(() => {
  // Render fine details on the high-res layer
  t.clear();
  t.charColor(255, 200, 100);
  t.char('.');
  const time = t.frameCount * 0.05;
  for(let i=0; i<50; i++) {
     t.push();
     t.translate(Math.cos(time+i)*30, Math.sin(time+i)*20);
     t.point();
     t.pop();
  }
});
