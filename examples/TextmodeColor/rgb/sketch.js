/**
 * @title TextmodeColor.rgb
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const color = t.color(50, 100, 200);
const labels = ['R', 'G', 'B'];
const channelColors = [
	[255, 110, 110],
	[120, 255, 140],
	[120, 180, 255],
];

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
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
	t.char('■');
	t.rect(8, 4);
	t.pop();

	drawCenteredText('RGB', -6, [180, 190, 220]);
	drawCenteredText(`[${r}, ${g}, ${b}]`, 5, color.rgb);
	drawCenteredText('red, green, blue components', 8, [170, 180, 205]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
