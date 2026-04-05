/**
 * @title Textmodifier.image
 * @author codex
 */
const t = textmode.create({
  width: 800,
  height: 600,
});

const fb = t.createFramebuffer({width: 30, height: 20});

t.draw(() => {
  // Draw something to the framebuffer
  fb.begin();
  t.clear();
  t.charColor(255, 0, 0);
  t.char('A');
  t.rect(20, 10);
  fb.end();

  // Clear main canvas and render framebuffer content
  t.background(0);

  // Render at original size
  t.image(fb);

  // Render scaled version
  // t.image(fb, 60, 40);
});
