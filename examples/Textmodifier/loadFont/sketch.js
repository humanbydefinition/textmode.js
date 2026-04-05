/**
 * @title Textmodifier.loadFont
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });
const accentLayer = t.layers.add({ fontSize: 24, blendMode: 'additive' });

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

t.setup(async () => {
  // Load a font and make it active on the base layer immediately.
  await t.loadFont('../../layering/FROGBLOCK-V2.1.ttf');

  // Preload a second font without changing the active base-layer font.
  const accentFont = await t.loadFont('../../primitives/CHUNKY.ttf', false);
  await accentLayer.loadFont(accentFont);
});

t.draw(() => {
  t.background(5, 8, 18);
  drawLabel('ACTIVE FONT', -4, [255, 235, 120]);
  drawLabel('BASE LAYER', 1, [220, 240, 255]);
});

accentLayer.draw(() => {
  t.clear();
  drawLabel('PRELOADED FONT', 6, [120, 220, 255]);
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
