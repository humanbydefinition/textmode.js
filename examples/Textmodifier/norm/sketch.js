/**
 * @title Textmodifier.norm
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let normalized = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 7, 17);
	const low = -18;
	const high = 18;
	raw = t.sin(t.frameCount * 0.04) * 20 + t.cos(t.frameCount * 0.018) * 4;
	normalized = t.norm(raw, low, high);

	for (let i = 0; i <= 36; i++) {
		const u = i / 36;
		const x = -18 + i;
		t.push();
		t.translate(x, 4);
		t.char(u <= t.constrain(normalized, 0, 1) ? '#' : '.');
		t.charColor(80 + u * 160, 140 + u * 100, 255 - u * 100);
		t.point();
		t.pop();
	}

	t.char('|');
	t.charColor(255, 210, 100);
	const marker = t.map(t.constrain(normalized, 0, 1), 0, 1, low, high);
	t.line(marker, -7, marker, 9);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.NORM', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RANGE TO 0..1', x, y++, 100, 220, 255);
	drawText('norm(value, low, high) scales.', x, y++, 140, 160, 190);
	drawText('This bar clamps only for display.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`NORM: ${normalized.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
