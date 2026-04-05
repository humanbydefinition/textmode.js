/**
 * @title Textmodifier.loadImage
 * @author codex
 */
// Loading and rendering external assets
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let img;

t.setup(async () => {
  // Remote image URL
  const url = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  img = await t.loadImage(url);

  // Configure character mapping for the image
  img.characters(" .:-=+*#%@");
});

t.draw(() => {
  t.background(0);
  if (img) {
    // Pulse image scale and rotation
    const scale = 1 + Math.sin(t.frameCount * 0.05) * 0.1;
    t.rotateZ(Math.sin(t.frameCount * 0.02) * 5);
    t.image(img, t.grid.cols * scale, t.grid.rows * scale);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
