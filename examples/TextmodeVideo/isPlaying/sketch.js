/**
 * @title TextmodeVideo.isPlaying
 * @author Assistant
 */
const VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let video = null;
let playing = false;

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.volume(0);
	await video.play();
	video.loop();
});

t.draw(() => {
	t.background(6, 8, 20);
	if (!video) return;

	t.image(video, t.grid.cols - 8, t.grid.rows - 10);
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

	drawText('TEXTMODEVIDEO.ISPLAYING', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PLAYBACK STATE INQUIRY', x, y++, 100, 220, 255);
	drawText('Checks if video is playing.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		const stateStr = playing ? '▶ ACTIVE PLAYING' : '⏸ PAUSED';
		const stateColor = playing ? [120, 255, 120] : [255, 120, 120];
		drawText(`STATE: ${stateStr}`, x, y++, ...stateColor);
		drawText(`isPlaying: ${playing}`, x, y++, 255, 210, 90);
		drawText('CLICK ANYWHERE TO TOGGLE PLAYBACK', x, y++, 120, 205, 255);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.mouseClicked(async () => {
	if (!video) return;
	if (video.isPlaying) {
		video.pause();
	} else {
		await video.play();
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
