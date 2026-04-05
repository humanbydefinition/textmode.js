/**
 * @title TextmodeLayer.font
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const layer = t.layers.add({ fontSize: 32, blendMode: 'additive' });

t.draw(() => {
  t.background(0);
  t.char('#');
  t.charColor(255, 100, 150);
  t.rect(t.grid.cols, t.grid.rows);
});

layer.draw(() => {
  t.clear();

  // Access the font object from the layer
  const font = layer.font;
  const chars = font.characters;

  // Display the first 64 characters of the font in a spiral
  const count = Math.min(chars.length, 64);
  const time = t.frameCount * 0.05;

  for(let i=0; i<count; i++) {
     const angle = i * 0.5 + time;
     const radius = i * 0.6 + 2;

     const x = Math.cos(angle) * radius;
     const y = Math.sin(angle) * radius * 0.5;

     t.push();
     t.translate(Math.round(x), Math.round(y));
     t.char(chars[i].character);
     // Color based on character index
     t.charColor(100 + i*2, 200 - i, 150 + i);
     t.point();
     t.pop();
  }

  // Display font info
  const info = `FONT SIZE: ${font.fontSize}`;
  t.charColor(255);
  for(let i=0; i<info.length; i++) {
     t.push();
     t.translate(i - info.length/2, -10);
     t.char(info[i]);
     t.point();
     t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
