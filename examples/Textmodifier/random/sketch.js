/**
 * @title Textmodifier.random
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	seed: 'random-demo',
});

const labelLayer = t.layers.add();
const characters = Array.from('░▒▓█+*#');
let mark = { x: 0, y: 0, char: '*', r: 255, g: 255, b: 255 };

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	t.background(5, 8, 18);
	if (t.frameCount % 12 === 1) {
		mark = {
			x: Math.floor(t.random(-18, 18)),
			y: Math.floor(t.random(-9, 9)),
			char: t.random(characters) ?? '*',
			r: Math.floor(t.random(120, 256)),
			g: Math.floor(t.random(120, 256)),
			b: Math.floor(t.random(120, 256)),
		};
	}

	t.push();
	t.translate(mark.x, mark.y);
	t.char(mark.char);
	t.charColor(mark.r, mark.g, mark.b);
	t.point();
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.RANDOM', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SEEDED CHOICES', x, y++, 100, 220, 255);
	drawText('The mark uses random ranges.', x, y++, 140, 160, 190);
	drawText('The seed repeats this sequence.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
