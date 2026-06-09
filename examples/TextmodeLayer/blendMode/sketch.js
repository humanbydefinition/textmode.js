/**
 * @title TextmodeLayer.blendMode
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const blendModes = ['additive', 'screen', 'overlay', 'difference', 'multiply'];
const colors = [
	[255, 80, 150],
	[80, 180, 255],
	[255, 200, 80],
	[150, 255, 120],
	[200, 120, 255],
];

const layers = blendModes.map((mode) => t.layers.add({ blendMode: mode, opacity: 0.9 }));
const labelLayer = t.layers.add();

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	drawText(text, -Math.floor(text.length / 2), y, rgb);
}

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(10, 15, 25);

	const { cols, rows } = t.grid;

	t.char('+');
	t.charColor(40, 50, 80);
	t.rect(cols, rows);

	layers.forEach((layer, i) => {
		layer.draw(() => {
			t.clear();
			t.push();

			const angle = (i / layers.length) * Math.PI * 2 + time;
			const radius = 8 + Math.sin(time * 2) * 2;
			t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);

			t.charColor(...colors[i]);
			t.char('@');
			t.rect(14, 8);

			drawCenteredText(blendModes[i], 0, [255, 255, 255]);

			t.pop();
		});
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const active = blendModes[Math.floor(t.frameCount / 80) % blendModes.length];

	drawText('TEXTMODELAYER.BLENDMODE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: PER-LAYER BLENDING', x, y++, [100, 220, 255]);
	drawText('Each layer composites differently.', x, y++, [140, 160, 190]);
	drawText('Opacity is set per layer too.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`MODES: ${blendModes.length}`, x, y++, [140, 255, 180]);
	drawText(`WATCH: ${active}`, x, y++, [120, 200, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
