/**
 * @title TextmodeColor.normalized
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
const color = t.color(255, 128, 0, 255);
const labels = ['R', 'G', 'B', 'A'];
const colors = [
	[255, 100, 100],
	[120, 255, 140],
	[120, 180, 255],
	[240, 240, 240],
];

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function drawMeter(label, value, y, rgb, phase, x) {
	const blocks = Math.round(value * 10);
	drawText(`${label} ${value.toFixed(2)}`, x, y, rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < 10; i++) {
		const active = i < blocks;
		const glow = active ? 40 + Math.round(60 * (0.5 + 0.5 * Math.sin(t.frameCount * 0.12 + phase + i))) : 0;
		const meterColor = active
			? [Math.min(255, rgb[0] + glow), Math.min(255, rgb[1] + glow), Math.min(255, rgb[2] + glow)]
			: [55, 65, 80];

		t.push();
		t.translate(x + 13 + i, y);
		t.charColor(meterColor[0], meterColor[1], meterColor[2]);
		t.char(active ? '|' : '.');
		t.point();
		t.pop();
	}
}

t.draw(() => {
	t.background(12, 16, 24);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const normalized = color.normalized;
	const rgba = color.rgba.join(', ');

	drawText('TEXTMODECOLOR.NORMALIZED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: NORMALIZED FLOAT VALUES', x, y++, 100, 220, 255);
	drawText(`RGBA : [${rgba}]`, x, y++, color.rgb[0], color.rgb[1], color.rgb[2]);
	drawText('------------------------------------', x, y++, 80, 100, 150);

	for (let i = 0; i < labels.length; i++) {
		drawMeter(labels[i], normalized[i], y++, colors[i], i * 0.8, x);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
