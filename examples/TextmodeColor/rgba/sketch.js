/**
 * @title TextmodeColor.rgba
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
const color = t.color(255, 128, 0, 100);

function drawChecker(x, y, width, height) {
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if ((row + col) % 2 !== 0) {
				continue;
			}
			t.push();
			t.translate(x + col, y + row);
			t.charColor(90, 100, 120, 90);
			t.char('.');
			t.point();
			t.pop();
		}
	}
}

function drawSwatch(x, swatchColor, alpha = 255) {
	const left = x - 4;
	drawChecker(left, -2, 8, 4);

	t.push();
	t.translate(x, 0);
	t.charColor(swatchColor[0], swatchColor[1], swatchColor[2], alpha);
	t.char('@');
	t.rect(8, 4);
	t.pop();
}

t.draw(() => {
	const [r, g, b, a] = color.rgba;
	const offset = Math.min(11, Math.max(8, Math.floor(t.grid.cols / 4)));

	t.background(12, 16, 24);

	drawSwatch(-offset, [r, g, b], 255);
	drawSwatch(offset, [r, g, b], a);
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

	const [r, g, b, a] = color.rgba;

	drawText('TEXTMODECOLOR.RGBA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RGBA COLOR SPECIFICATION', x, y++, 100, 220, 255);
	drawText(`COLOR ARY : [${r}, ${g}, ${b}, ${a}]`, x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Left Swatch : Alpha = 255', x, y++, 140, 190, 255);
	drawText(`Right Swatch: Alpha = ${a}`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
