/**
 * @title Textmodifier.round
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let coarse = 0;
let decimal = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 16);
	raw = t.sin(t.frameCount * 0.037) * 12 + t.cos(t.frameCount * 0.019) * 3;
	coarse = t.round(raw);
	decimal = t.round(raw, 1);

	for (let x = -22; x <= 22; x++) {
		const isCoarse = x === coarse;
		t.push();
		t.translate(x, 2 + t.sin(x * 0.4 + t.frameCount * 0.04) * 4);
		t.char(isCoarse ? '#' : '.');
		t.charColor(isCoarse ? 255 : 55, isCoarse ? 215 : 80, isCoarse ? 100 : 120);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(120, 245, 255);
	t.push();
	t.translate(decimal, -6);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.ROUND', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: NEAREST VALUE', x, y++, 100, 220, 255);
	drawText('round() snaps to the closest cell.', x, y++, 140, 160, 190);
	drawText('round(value, 1) keeps one decimal.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`ROUND: ${coarse}`, x, y++, 220, 230, 255);
	drawText(`ROUND.1: ${decimal.toFixed(1)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
