/**
 * @title Textmodifier.sqrt
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let value = 0;
let root = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(3, 8, 16);
	value = t.norm(t.sin(t.frameCount * 0.035), -1, 1) * 64 + t.norm(t.cos(t.frameCount * 0.019), -1, 1) * 8;
	root = t.sqrt(value);

	for (let i = 0; i < 32; i++) {
		const v = i * 2;
		const x = -24 + i * 1.5;
		const y = 8 - t.sqrt(v) * 2;
		const active = v <= value;
		t.push();
		t.translate(x, y);
		t.char(active ? '#' : '.');
		t.charColor(active ? 110 : 45, active ? 225 : 65, active ? 255 : 95);
		t.point();
		t.pop();
	}

	t.char('@');
	t.charColor(255, 220, 100);
	t.push();
	t.translate(-24 + value * 0.75, 8 - root * 2);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -t.floor(t.grid.cols / 2);
	const top = -t.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SQRT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: COMPRESSED GROWTH', x, y++, 100, 220, 255);
	drawText('sqrt() grows quickly, then eases.', x, y++, 140, 160, 190);
	drawText('The yellow sample climbs slowly.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`VALUE: ${value.toFixed(1)}`, x, y++, 220, 230, 255);
	drawText(`SQRT: ${root.toFixed(2)}`, x, y++, 220, 230, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
