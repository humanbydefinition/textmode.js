/**
 * @title TextmodeVideo.videoElement
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
let readyState = 0;
let videoWidth = 0;
let videoHeight = 0;
let tagName = 'null';

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

	const el = video.videoElement;
	readyState = el ? el.readyState : 0;
	videoWidth = el ? el.videoWidth : 0;
	videoHeight = el ? el.videoHeight : 0;
	tagName = el ? el.tagName.toLowerCase() : 'null';
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

	drawText('TEXTMODEVIDEO.VIDEOELEMENT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ACCESS NATIVE VIDEO ELEMENT', x, y++, 100, 220, 255);
	drawText('Queries DOM element properties.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	if (video) {
		drawText(`READY STATE : ${readyState}`, x, y++, 120, 205, 255);
		drawText(`SOURCE WIDTH: ${videoWidth}px`, x, y++, 220, 220, 220);
		drawText(`SRC HEIGHT  : ${videoHeight}px`, x, y++, 220, 220, 220);
		drawText(`TAG NAME    : <${tagName}>`, x, y++, 180, 255, 180);
	} else {
		drawText('LOADING VIDEO...', x, y++, 255, 180, 120);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
