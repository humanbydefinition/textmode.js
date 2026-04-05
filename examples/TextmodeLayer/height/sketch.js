/**
 * @title TextmodeLayer.height
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const waveLayer = t.layers.add({ blendMode: 'lighten' });

t.draw(() => {
  t.background(0);
  // Background Grid Dots
  t.charColor(30);
  t.char('|');
  for (let x = -t.grid.cols/2; x < t.grid.cols/2; x+=4) {
      for (let y = -t.grid.rows/2; y < t.grid.rows/2; y+=4) {
          t.push();
          t.translate(x, y);
          t.point();
          t.pop();
      }
  }
});

waveLayer.draw(() => {
  t.clear();
  const h = waveLayer.height; // Property being demonstrated

  // Draw an oscilloscope waveform scaled to the layer height
  const time = t.frameCount * 0.1;
  const amplitude = (h / t.grid.cellHeight) * 0.4; // Use 40% of layer height

  for (let x = -t.grid.cols/2; x < t.grid.cols/2; x++) {
      // Combine multiple sine waves for a rich signal
      const yNorm = Math.sin(x * 0.1 + time) * 0.5 + Math.sin(x * 0.3 - time * 2) * 0.25;
      const y = Math.round(yNorm * amplitude);

      // Color based on height (heat map)
      const intensity = Math.abs(yNorm);
      t.push();
      t.translate(x, y);
      t.char('-'); // Waveform line
      t.charColor(255 * intensity, 100, 255 * (1-intensity));
      t.point();

      // Echo/Shadow effect
      if (x % 2 === 0) {
          t.translate(0, -Math.sign(y));
          t.char('.');
          t.charColor(100, 100, 100);
          t.point();
      }
      t.pop();
  }

  // Display Height Value in top-left
  const label = `MAX_AMP: ${h}px`;
  t.charColor(255);
  for(let i=0; i<label.length; i++) {
     t.push();
     t.translate(i - t.grid.cols/2 + 2, -t.grid.rows/2 + 1);
     t.char(label[i]);
     t.point();
     t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
