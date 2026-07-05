/**
 * @title Textmodifier.sin
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
	t.background(3, 7, 18);
	phase = t.frameCount * 0.06;
	const width = t.min(54, t.grid.cols - 8);
	const amp = t.max(4, t.grid.rows * 0.18);
	sample = t.sin(phase);

	for (let x = -t.floor(width / 2); x <= t.floor(width / 2); x++) {
		const a = phase + x * 0.28;
		const y = t.round(t.sin(a) * amp);
		const pulse = t.norm(t.sin(a), -1, 1);
		t.push();
		t.translate(x, y);
		t.char(pulse > 0.7 ? '*' : pulse > 0.35 ? '+' : '.');
		t.charColor(70 + pulse * 170, 130 + pulse * 100, 255);
		t.point();
		t.pop();
	}

	t.char('-');
	t.charColor(55, 75, 115);
	t.line(-t.floor(width / 2), 0, t.floor(width / 2), 0);
	t.char('@');
	t.charColor(255, 220, 100);
	t.push();
	t.translate(0, t.round(sample * amp));
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SIN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SMOOTH OSCILLATION', x, y++, 100, 220, 255);
	drawText('sin(angle) flows from -1 to 1.', x, y++, 140, 160, 190);
	drawText('The yellow point samples phase.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SIN: ${sample.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
