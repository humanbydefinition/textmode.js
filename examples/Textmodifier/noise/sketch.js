/**
 * @title Textmodifier.noise
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	seed: 'noise-field',
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

t.draw(() => {
	t.background(3, 8, 18);
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.018;

	for (let y = 0; y < t.grid.rows; y += 1) {
		for (let x = 0; x < t.grid.cols; x += 1) {
			const value = t.noise(x * 0.08, y * 0.08, time);
			const index = Math.floor(value * (ramp.length - 1));
			t.push();
			t.translate(left + x, top + y);
			t.char(ramp[index]);
			t.charColor(60 + value * 180, 150 + value * 90, 255);
			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.NOISE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ORGANIC FIELD', x, y++, 100, 220, 255);
	drawText('Nearby inputs return close values.', x, y++, 140, 160, 190);
	drawText('Z acts like a smooth time axis.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
