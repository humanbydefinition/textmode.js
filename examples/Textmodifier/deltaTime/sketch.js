/**
 * @title Textmodifier.deltaTime
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let xPos = -18;
let dt = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 22);
	dt = t.deltaTime();
	xPos += dt * 0.01;
	if (xPos > 18) xPos = -18;
	t.charColor(60, 70, 100);
	t.char('-');
	t.line(-18, 0, 18, 0);
	t.push();
	t.translate(xPos, 0);
	t.char('@');
	t.charColor(140, 255, 180);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.DELTATIME', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FRAME ELAPSED MS', x, y++, 100, 220, 255);
	drawText('Motion scales by deltaTime.', x, y++, 140, 160, 190);
	drawText('Speed stays frame-rate aware.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`DT: ${dt.toFixed(1)} MS`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
