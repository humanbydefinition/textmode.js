/**
 * @title Textmodifier.ceil
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let raw = 0;
let snapped = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(7, 6, 17);
	raw = t.norm(t.sin(t.frameCount * 0.045) + t.cos(t.frameCount * 0.017) * 0.25, -1.25, 1.25) * 14;
	snapped = t.ceil(raw);

	for (let i = 0; i < 15; i++) {
		const active = i < snapped;
		t.push();
		t.translate(-16 + i * 2, 6 - i * 0.35);
		t.char(active ? '#' : '.');
		t.charColor(active ? 120 + i * 8 : 50, active ? 245 : 65, active ? 170 : 95);
		t.rect(1, active ? 2 + i * 0.2 : 1);
		t.pop();
	}

	t.char('-');
	t.charColor(255, 150, 120);
	t.line(-18, 8 - raw, 16, 8 - raw);
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CEIL', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SNAP UP', x, y++, 100, 220, 255);
	drawText('ceil() counts partial cells full.', x, y++, 140, 160, 190);
	drawText('Green blocks anticipate growth.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RAW: ${raw.toFixed(2)}`, x, y++, 220, 230, 255);
	drawText(`CEIL: ${snapped}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
