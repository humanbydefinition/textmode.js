/**
 * @title TextmodeVideo.volume
 * @author codex
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let video;
let audioEnabled = false;

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

	t.image(video);

	if (audioEnabled) {
		const halfHeight = t.grid.rows / 2;
		const normalizedY = (t.mouse.y + halfHeight) / t.grid.rows;
		const level = 1 - Math.max(0, Math.min(1, normalizedY));

		video.volume(level);
		drawLabel(`volume(${level.toFixed(2)})`, Math.floor(t.grid.rows / 2) - 4);
	} else {
		drawLabel('click once to unmute videoElement', Math.floor(t.grid.rows / 2) - 4);
	}

	drawLabel('move vertically to change volume()', Math.floor(t.grid.rows / 2) - 2);
});

t.mouseClicked(async () => {
	if (!video || audioEnabled) return;

	video.videoElement.muted = false;
	audioEnabled = true;
	await video.play();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
