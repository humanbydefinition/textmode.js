/**
 * @title Textmodifier.windowResized
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

function drawLabel(label, y, color) {
  const startX = -label.length / 2;
  t.charColor(...color);

  for (let i = 0; i < label.length; i++) {
    t.push();
    t.translate(startX + i + 0.5, y);
    t.char(label[i]);
    t.point();
    t.pop();
  }
}

t.draw(() => {
  t.background(8, 12, 24);
  drawLabel('WINDOW RESIZED', -6, [255, 230, 120]);
  drawLabel(`${t.width} x ${t.height}`, 0, [220, 240, 255]);
  drawLabel('stretch the browser window', 6, [120, 220, 255]);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
