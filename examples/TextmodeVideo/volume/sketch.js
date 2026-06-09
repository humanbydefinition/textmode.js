/**
 * @title TextmodeVideo.volume
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
let audioEnabled = false;
let level = 0;

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.loop();
	await video.play();
});

t.draw(() => {
	t.background(6, 8, 20);
	if (!video) return;

	t.image(video);

	if (audioEnabled) {
		const halfHeight = t.grid.rows / 2;
		const normalizedY = (t.mouse.y + halfHeight) / t.grid.rows;
		level = 1 - Math.max(0, Math.min(1, normalizedY));
		video.volume(level);
	}
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

	drawText('TEXTMODEVIDEO.VOLUME', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: AUDIO VOLUME AMPLITUDE', x, y++, 100, 220, 255);
	drawText('Controls video audio loudness.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		if (audioEnabled) {
			drawText(`VOLUME LEVEL: ${level.toFixed(2)}`, x, y++, 255, 210, 90);
			drawText('MOVE MOUSE VERTICALLY FOR VOLUME', x, y++, 120, 205, 255);
		} else {
			drawText('CLICK ANYWHERE TO UNMUTE AUDIO', x, y++, 255, 120, 120);
		}
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
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
