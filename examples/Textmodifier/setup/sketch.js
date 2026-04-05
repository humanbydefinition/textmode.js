/**
 * @title Textmodifier.setup
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let stamp;

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
  // One-time setup work can allocate reusable resources.
  stamp = t.createFramebuffer({ width: 18, height: 6 });

  stamp.begin();
  t.background(35, 20, 70);
  drawLabel('READY', 0, [255, 210, 120]);
  stamp.end();
});

t.draw(() => {
  t.background(6, 10, 18);
  drawLabel('SETUP RUNS ONCE', -8, [220, 240, 255]);

  for (let i = 0; i < 5; i++) {
    t.push();
    t.translate(Math.sin(t.frameCount * 0.03 + i) * 16, i * 4 - 1);
    t.image(stamp);
    t.pop();
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
