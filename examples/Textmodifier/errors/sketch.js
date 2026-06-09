/**
 * @title Textmodifier.errors
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

let triggerError = false;
const labelLayer = t.layers.add();

window.addEventListener(
	'click',
	() => {
		triggerError = true;
	},
	{ once: true }
);

t.draw(() => {
	t.background(10, 12, 24);

	// Render a spinning neon cyan gear to demonstrate active draw loop
	const time = t.frameCount * 0.05;
	for (let i = 0; i < 8; i++) {
		const angle = time + (i / 8) * Math.PI * 2;
		t.push();
		t.translate(Math.cos(angle) * 8, Math.sin(angle) * 4);
		t.charColor(0, 180, 255);
		t.char('*');
		t.point();
		t.pop();
	}

	if (triggerError) {
		throw new Error('This example intentionally triggers the error layer.');
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

	drawText('TEXTMODIFIER.ERRORS', x, y++, 255, 100, 100);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: AUTOMATED RUNTIME ERROR CAPTURE', x, y++, 100, 220, 255);
	drawText('Shows fallback error overlay.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	const state = Boolean(t.errors) ? 'TRUE' : 'FALSE';
	drawText(`ERRORS: ${state}`, x, y++, 140, 190, 255);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CLICK TO TRIGGER ERROR', x, y++, 255, 200, 100);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
