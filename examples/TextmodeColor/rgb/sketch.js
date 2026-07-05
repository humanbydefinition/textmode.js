/**
 * @title TextmodeColor.rgb
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
const color = t.color(50, 100, 200);
const labels = ['R', 'G', 'B'];
const channelColors = [
	[255, 110, 110],
	[120, 255, 140],
	[120, 180, 255],
];

t.draw(() => {
	const [r, g, b] = color.rgb;
	const values = [r, g, b];

	t.background(10, 14, 24);

	for (let i = 0; i < values.length; i++) {
		const angle = t.frameCount * 0.03 + (Math.PI * 2 * i) / values.length;
		const radius = 6 + (values[i] / 255) * 8;
		const x = Math.round(Math.cos(angle) * radius * 1.4);
		const y = Math.round(Math.sin(angle) * radius);

		t.push();
		t.translate(x, y);
		t.charColor(channelColors[i][0], channelColors[i][1], channelColors[i][2]);
		t.char(labels[i]);
		t.point();
		t.pop();
	}

	t.push();
	t.charColor(color);
	t.char('o');
	t.rect(8, 4);
	t.pop();
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

	const [r, g, b] = color.rgb;

	drawText('TEXTMODECOLOR.RGB', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: RGB COLOR COMPONENTS', x, y++, 100, 220, 255);
	drawText('Accesses red, green, blue channels.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`RGB ARRAY : [${r}, ${g}, ${b}]`, x, y++, color.rgb[0], color.rgb[1], color.rgb[2]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
