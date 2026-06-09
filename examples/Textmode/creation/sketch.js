/**
 * @title Textmode.creation
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
});

const labelLayer = t.layers.add();
const chars = 'TEXTMODE';

t.draw(() => {
	t.background(8, 12, 24);

	for (let i = 0; i < chars.length; i++) {
		const angle = t.frameCount * 0.03 + (Math.PI * 2 * i) / chars.length;
		const radius = 7 + Math.sin(t.frameCount * 0.08 + i) * 2;
		const x = Math.round(Math.cos(angle) * radius * 1.6);
		const y = Math.round(Math.sin(angle) * radius);

		t.push();
		t.translate(x, y);
		t.charColor(120 + i * 14, 180 + i * 6, 255);
		t.char(chars[i]);
		t.point();
		t.pop();
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

	drawText('TEXTMODE.CREATION', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INITIALIZATION FUNCTION', x, y++, 100, 220, 255);
	drawText('Creates a Textmodifier instance.', x, y++, 140, 160, 190);
	drawText('Configures default viewport/canvas.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
