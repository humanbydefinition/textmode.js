/**
 * @title TextmodeColor.b
 * @author codex
 */
// Blue channel waves
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

t.draw(() => {
  t.background(0, 0, 20);

  for (let y = -10; y < 10; y++) {
    const phase = y * 0.2 + t.frameCount * 0.05;
    const offset = Math.sin(phase) * 5;

    // Generate a color for this wave
    const waveColor = t.color(50, 100, 150 + Math.sin(phase) * 100);

    t.push();
    t.translate(0, y * 2);
    t.char('~');

    // Read the blue component to modulate opacity
    t.charColor(100, 200, waveColor.b, waveColor.b); // Blue determines alpha

    t.rect(t.grid.cols * 0.8 + offset, 1);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
