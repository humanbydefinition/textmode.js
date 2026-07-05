/**
 * @title Textmodifier.noiseSeed
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const ramp = ' .:-=+*#%@';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawBand(offsetX) {
	const top = -Math.floor(t.grid.rows / 2) + 10;
	t.noiseSeed('matched-band');
	for (let y = 0; y < Math.min(18, t.grid.rows - 12); y += 1) {
		for (let x = 0; x < 18; x += 1) {
			const value = t.noise(x * 0.12, y * 0.12, t.frameCount * 0.01);
			const index = Math.floor(value * (ramp.length - 1));
			t.push();
			t.translate(offsetX + x, top + y);
			t.char(ramp[index]);
			t.charColor(80 + value * 160, 255, 130 + value * 100);
			t.point();
			t.pop();
		}
	}
}

t.draw(() => {
	t.background(5, 10, 18);
	drawBand(-22);
	drawBand(4);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.NOISESEED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: REPEATABLE FIELDS', x, y++, 100, 220, 255);
	drawText('Both bands use the same seed.', x, y++, 140, 160, 190);
	drawText('Same coordinates make same values.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
