/**
 * @title Textmodifier.loadVideo
 * @author codex
 */
// Video to ASCII conversion
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let video;

t.setup(async () => {
  const url = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  video = await t.loadVideo(url);

  // Configure video playback
  video.play();
  video.loop();

  // Set ASCII density characters
  video.characters(" .:-=+*#%@");
});

t.draw(() => {
  t.background(0);
  if (video) {
    // Rotate and draw the video
    t.rotateY(t.frameCount);
    t.image(video, 40, 30);
  }
});

t.windowResized(() => {
  t.resizeCanvas(window.innerWidth, window.innerHeight);
});
