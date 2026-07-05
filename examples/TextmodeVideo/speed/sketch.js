/**
 * @title TextmodeVideo.speed
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
let rate = 1.0;

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

	const halfWidth = t.grid.cols / 2;
	const normalizedX = (t.mouse.x + halfWidth) / t.grid.cols;
	const clampedX = Math.max(0, Math.min(1, normalizedX));
	rate = 0.1 + clampedX * 3.9;

	video.speed(rate);
	t.image(video);
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

	drawText('TEXTMODEVIDEO.SPEED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PLAYBACK RATE CONTROL', x, y++, 100, 220, 255);
	drawText('Alters playback speed dynamically.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		drawText(`CURRENT SPEED: ${rate.toFixed(1)}x`, x, y++, 255, 210, 90);
		drawText('MOVE MOUSE HORIZONTALLY TO CHANGE', x, y++, 120, 205, 255);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
