/**
 * @title TextmodeVideo.dispose
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
let disposed = false;

t.setup(async () => {
	video = await t.loadVideo(VIDEO_URL);
	video.characters(' .:-=+*#%@');
	video.volume(0);
	await video.play();
});

t.draw(() => {
	t.background(5, 7, 18);
	if (video && !disposed) {
		t.image(video, t.grid.cols - 8, t.grid.rows - 10);
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

	drawText('TEXTMODEVIDEO.DISPOSE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLEANUP AND DISPOSAL', x, y++, 100, 220, 255);
	drawText('Releases video resources.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (disposed) {
		drawText('STATUS: DISPOSED', x, y++, 255, 120, 120);
	} else if (video) {
		drawText('STATUS: ACTIVE', x, y++, 120, 255, 120);
		drawText('CLICK ANYWHERE TO DISPOSE VIDEO', x, y++, 255, 210, 90);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.mouseClicked(() => {
	if (!video || disposed) return;
	video.dispose();
	disposed = true;
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
