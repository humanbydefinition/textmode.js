/**
 * @title TextmodeColor.withAlpha
 */
const t = textmode.create({ pixelDensity: 1, width: window.innerWidth, height: window.innerHeight });

const layers = Array.from({ length: 5 }, () => t.layers.add());
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(0);
});

layers.forEach((layer, i) => {
	layer.draw(() => {
		t.clear();

		const base = t.color(50, 150, 255);
		const opacity = 100 + i * 30;

		t.push();
		t.translate((i - 2) * 5, Math.sin(t.frameCount * 0.05 + i) * 5);
		t.charColor(base.withAlpha(opacity));
		t.char(String.fromCharCode(65 + i));
		t.rect(12, 12);
		t.pop();
	});
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

	drawText('TEXTMODECOLOR.WITHALPHA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: CLONE COLOR WITH NEW ALPHA', x, y++, 100, 220, 255);
	drawText('Returns copy with adjusted opacity.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('Rendering layers A-E with alpha.', x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
