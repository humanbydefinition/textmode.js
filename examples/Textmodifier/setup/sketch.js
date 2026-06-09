/**
 * @title Textmodifier.setup
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let seed = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	seed = Math.floor(Math.random() * 999);
});

t.draw(() => {
	t.background(6, 10, 22);
	const time = t.frameCount * 0.03;
	for (let i = 0; i < 8; i++) {
		t.push();
		t.translate(Math.cos(time + i) * 12, Math.sin(time + i) * 6);
		t.char(String((seed + i) % 10));
		t.charColor(120 + i * 12, 220, 255 - i * 10);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SETUP', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ONE-TIME INIT', x, y++, 100, 220, 255);
	drawText('setup() runs before drawing.', x, y++, 140, 160, 190);
	drawText('Seed is created once.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`SEED: ${seed}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
