/**
 * @title TextmodeColor.normalized
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const color = t.color(255, 128, 0, 255);
const labels = ['R', 'G', 'B', 'A'];
const colors = [
	[255, 100, 100],
	[120, 255, 140],
	[120, 180, 255],
	[240, 240, 240],
];

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	drawText(text, -Math.floor(text.length / 2), y, rgb);
}

function drawMeter(label, value, y, rgb, phase) {
	const blocks = Math.round(value * 10);
	drawText(`${label} ${value.toFixed(2)}`, -13, y, rgb);

	for (let i = 0; i < 10; i++) {
		const active = i < blocks;
		const glow = active ? 40 + Math.round(60 * (0.5 + 0.5 * Math.sin(t.frameCount * 0.12 + phase + i))) : 0;
		const meterColor = active
			? [Math.min(255, rgb[0] + glow), Math.min(255, rgb[1] + glow), Math.min(255, rgb[2] + glow)]
			: [55, 65, 80];

		t.push();
		t.translate(1 + i, y);
		t.charColor(meterColor[0], meterColor[1], meterColor[2]);
		t.char(active ? '|' : '░');
		t.point();
		t.pop();
	}
}

t.draw(() => {
	const normalized = color.normalized;
	const rgba = color.rgba.join(', ');

	t.background(12, 16, 24);

	drawCenteredText('NORMALIZED', -6, [180, 190, 220]);
	drawCenteredText(`RGBA: ${rgba}`, -2, color.rgb);
	drawCenteredText(`[${normalized.map((value) => value.toFixed(2)).join(', ')}]`, 0, [230, 235, 245]);

	for (let i = 0; i < labels.length; i++) {
		drawMeter(labels[i], normalized[i], 3 + i * 2, colors[i], i * 0.8);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
