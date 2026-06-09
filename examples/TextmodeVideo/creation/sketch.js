/**
 * @title TextmodeVideo.creation
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

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.volume(0);
	await video.play();
	video.loop();
});

t.draw(() => {
	t.background(6, 12, 10);
	if (video) {
		t.image(video);
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

	drawText('TEXTMODEVIDEO.CREATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: VIDEO LOADING & PLAYBACK', x, y++, 100, 220, 255);
	drawText('Demonstrates loadVideo API.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(video ? 'STATUS: VIDEO LOADED AND PLAYING' : 'STATUS: LOADING VIDEO...', x, y++, 255, 210, 90);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
