/**
 * @title Textmodifier.cos
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let phase = 0;
let sample = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 15);
	phase = t.frameCount * 0.045;
	sample = t.cos(phase);
	const rings = 9;

	for (let i = rings; i >= 1; i--) {
		const wave = t.norm(t.cos(phase + i * 0.45), -1, 1);
		const rx = 2 + i * 3 + wave * 3;
		const ry = 1 + i * 1.2 + wave * 2;
		t.push();
		t.char(i % 2 === 0 ? '.' : '+');
		t.charColor(70 + wave * 140, 120 + wave * 90, 230);
		t.ellipse(rx, ry);
		t.pop();
	}

	t.push();
	t.translate(t.round(sample * 18), 0);
	t.char('@');
	t.charColor(255, 215, 110);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.COS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PHASED BREATHING', x, y++, 100, 220, 255);
	drawText('cos() starts at 1, then cycles.', x, y++, 140, 160, 190);
	drawText('Rings expand by cosine phase.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`COS: ${sample.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
