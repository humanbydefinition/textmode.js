/**
 * @title Textmodifier.createFramebuffer
 * @author codex
 */
const t = textmode.create({
  width: 800,
  height: 600,
});

// Create a framebuffer with 50x30 grid cells
const fb = t.createFramebuffer({
  width: 50,
  height: 30
});

t.draw(() => {
  // Render to framebuffer
  fb.begin();
  t.background(255, 0, 0);
  t.charColor(255);
  t.char('A');
  t.rect(20, 10);
  fb.end();

  // Render framebuffer to main canvas
  t.background(0);
  t.rotateZ(t.frameCount * 2);
  t.image(fb);
});
