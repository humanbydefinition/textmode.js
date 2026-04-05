/**
 * @title Textmodifier.resizeCanvas
 * @author codex
 */
const t = textmode.create({ width: 600, height: 400 });

let direction = 1;

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
  if (t.frameCount % 90 === 0) {
    const nextWidth = direction > 0 ? 800 : 600;
    const nextHeight = direction > 0 ? 600 : 400;
    t.resizeCanvas(nextWidth, nextHeight);
    direction *= -1;
    return;
  }

  t.background(10, 16, 28);
  drawLabel(`${t.width} x ${t.height}`, -2, [255, 230, 120]);
  drawLabel('resizeCanvas()', 0, [220, 240, 255]);
  drawLabel('updates grid + viewport', 2, [120, 220, 255]);
});
