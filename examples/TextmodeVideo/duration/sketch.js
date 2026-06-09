/**
 * @title TextmodeVideo.duration
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
let dur = 0;
let pct = 0;

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

	dur = video.duration || 0;
	const maxExpectedDuration = 10;
	pct = Math.min(dur / maxExpectedDuration, 1);

	const gaugeWidth = Math.floor(t.grid.cols * 0.5);
	const startX = -Math.floor(gaugeWidth / 2);
	const filled = Math.floor(pct * gaugeWidth);

	t.push();
	t.translate(startX, 3);
	for (let i = 0; i < gaugeWidth; i++) {
		t.push();
		t.translate(i, 0);
		if (i < filled) {
			t.charColor(180, 255, 180);
			t.char('■');
		} else {
			t.charColor(60, 70, 95);
			t.char('·');
		}
		t.point();
		t.pop();
	}
	t.pop();
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

	drawText('TEXTMODEVIDEO.DURATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: TOTAL RUNTIME DURATION', x, y++, 100, 220, 255);
	drawText('Length of the loaded video.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		drawText(`DURATION: ${dur.toFixed(3)}s`, x, y++, 255, 210, 90);
		const pctStr = `${(pct * 100).toFixed(0)}% of Max Reference (10.0s)`;
		drawText(pctStr, x, y++, 160, 170, 195);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
