/**
 * @title TextmodeVideo.stop
 * @author Assistant
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let video = null;
let playing = false;
let restartTimeout = null;

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.loop();
	video.volume(0);
	await video.play();
});

t.draw(() => {
	t.background(6, 8, 20);
	if (!video) return;

	t.image(video);
	playing = video.isPlaying;
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEVIDEO.STOP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TERMINATING PLAYBACK', x, y++, 100, 220, 255);
	drawText('Stops video and resets timeline.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		const state = playing ? 'PLAYING' : 'STOPPED';
		drawText(`PLAY: ${state}`, x, y++, 255, 210, 90);
		drawText("PRESS 'S' TO STOP VIDEO", x, y++, 120, 205, 255);
		if (restartTimeout) {
			drawText('RESTARTING IN 1 SECOND...', x, y++, 140, 160, 190);
		}
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
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
