/**
 * @title Textmodifier.cellColor
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let currentR = 0,
	currentG = 0,
	currentB = 0;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.cellColor', -12, [240, 245, 255]);
	drawCenteredText('Setting the background color of individual cells.', -10, [150, 170, 200]);

	drawCenteredText('RGB GETTER READOUT', 8, [140, 255, 180]);
	drawCenteredText(
		`R: ${currentR.toString().padStart(3, '0')}  G: ${currentG.toString().padStart(3, '0')}  B: ${currentB.toString().padStart(3, '0')}`,
		10,
		[140, 180, 255]
	);

	drawCenteredText('t.cellColor(r, g, b)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.03;
	const r = Math.round(127 + 127 * Math.sin(time));
	const g = Math.round(127 + 127 * Math.cos(time * 0.7));
	const b = 150;

	t.cellColor(r, g, b);

	const cell = t.cellColor();
	currentR = cell.r;
	currentG = cell.g;
	currentB = cell.b;

	t.push();
	t.charColor(255);
	t.char('#');
	t.rect(14, 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
