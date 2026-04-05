/**
 * @title TextmodeVideo.speed
 * @author codex
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let video;

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(255);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.loop();
	await video.play();
});

t.draw(() => {
	t.background(0);
	if (!video) return;

	const halfWidth = t.grid.cols / 2;
	const normalizedX = (t.mouse.x + halfWidth) / t.grid.cols;
	const clampedX = Math.max(0, Math.min(1, normalizedX));
	const rate = 0.1 + clampedX * 3.9;

	video.speed(rate);
	t.image(video);
	drawLabel(`speed(${rate.toFixed(1)})`, Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
