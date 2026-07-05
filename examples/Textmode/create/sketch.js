/**
 * @title Textmode.create
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const chars = ['.', '+', '*', 'o'];

t.draw(() => {
	t.background(6, 14, 22);

	for (let ray = 0; ray < 12; ray++) {
		const angle = t.frameCount * 0.03 + (Math.PI * 2 * ray) / 12;

		for (let step = 3; step <= 10; step++) {
			const pulse = 0.5 + 0.5 * Math.sin(t.frameCount * 0.08 - step + ray * 0.4);
			const radius = step * (1.6 + pulse * 0.6);
			const x = Math.round(Math.cos(angle) * radius * 1.7);
			const y = Math.round(Math.sin(angle) * radius);
			const char = chars[(ray + step) % chars.length];

			t.push();
			t.translate(x, y);
			t.charColor(70 + step * 18, 160 + Math.round(pulse * 70), 255);
			t.char(char);
			t.point();
			t.pop();
		}
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

	drawText('TEXTMODE.CREATE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: STATIC CONTEXT BUILDER', x, y++, 100, 220, 255);
	drawText('Instantiates a sketch instance.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Returns fully configured t context.', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
