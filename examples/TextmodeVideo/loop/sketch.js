/**
 * @title TextmodeVideo.loop
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
let currentTime = 0;
let duration = 0;

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.loop(false);
	video.volume(0);
	await video.play();
});

t.draw(() => {
	t.background(6, 8, 20);
	if (!video) return;

	t.image(video);
	currentTime = video.currentTime;
	duration = video.duration || 1;

	if (!video.isPlaying && video.currentTime >= video.duration) {
		video.time(0);
		void video.play();
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

	drawText('TEXTMODEVIDEO.LOOP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOOP CONTROL & END EVENT', x, y++, 100, 220, 255);
	drawText('Disables auto-loop, loops manually.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		drawText(`CURRENT TIME: ${currentTime.toFixed(1)}s`, x, y++, 255, 210, 90);
		drawText(`DURATION    : ${duration.toFixed(1)}s`, x, y++, 255, 210, 90);
		drawText('LOOP MODE   : MANUAL DETECT', x, y++, 120, 205, 255);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
