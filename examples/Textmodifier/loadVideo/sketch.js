/**
 * @title Textmodifier.loadVideo
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let video;

t.setup(async () => {
	const url = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
	video = await t.loadVideo(url);

	video.play();
	video.loop();

	video.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (video) {
		t.rotateY(t.frameCount);
		t.image(video, 40, 30);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
