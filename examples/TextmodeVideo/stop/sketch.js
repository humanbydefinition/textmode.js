/**
 * @title TextmodeVideo.stop
 * @author codex
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let video;
let restartTimeout = null;

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
	drawLabel("press 's' to stop()", Math.floor(t.grid.rows / 2) - 2);
});

t.keyPressed(() => {
	if (!video || !t.isKeyPressed('s')) return;

	video.stop();
	if (restartTimeout) clearTimeout(restartTimeout);
	restartTimeout = setTimeout(() => {
		void video.play();
		restartTimeout = null;
	}, 1000);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
