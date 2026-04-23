/**
 * @title Textmodifier.fontSize
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

t.setup(() => {
  // Set the base layer font size.
  t.fontSize(32);
});

t.draw(() => {
  const currentSize = t.fontSize();
  const pulse = 2 + Math.sin(t.frameCount * 0.08) * 1.5;

  t.background(6, 10, 18);

  drawLabel('FONT SIZE', -5, [255, 230, 120]);
  drawLabel(`${currentSize}px`, 0, [220, 240, 255]);

  t.charColor(120, 220, 255);
  t.char('#');

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + t.frameCount * 0.03;
    const radius = currentSize / 8 + pulse;

    t.push();
    t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius + 6);
    t.point();
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
