/**
 * @title TextmodeVideo.currentTime
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

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.volume(0);
	video.loop();
	await video.play();
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 8, 20);
	if (video) t.image(video, t.grid.cols - 8, t.grid.rows - 10);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODEVIDEO.CURRENTTIME', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PLAYBACK POSITION', x, y++, 100, 220, 255);
	drawText('Read current video time.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const now = video ? video.currentTime.toFixed(2) : '0.00';
	const dur = video ? video.duration.toFixed(2) : '0.00';
	drawText(`TIME: ${now}`, x, y++, 255, 210, 90);
	drawText(`DUR: ${dur}`, x, y++, 120, 205, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
