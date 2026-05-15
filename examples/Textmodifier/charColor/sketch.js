/**
 * @title Textmodifier.charColor
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

	drawCenteredText('Textmodifier.charColor', -12, [240, 245, 255]);
	drawCenteredText('Setting the primary stroke color of character glyphs.', -10, [150, 170, 200]);

	drawCenteredText('RGB GETTER READOUT', 8, [140, 255, 180]);
	drawCenteredText(
		`R: ${currentR.toString().padStart(3, '0')}  G: ${currentG.toString().padStart(3, '0')}  B: ${currentB.toString().padStart(3, '0')}`,
		10,
		[140, 180, 255]
	);

	drawCenteredText('t.charColor(r, g, b)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.04;
	const r = Math.round(150 + 105 * Math.sin(time));
	const g = Math.round(150 + 105 * Math.cos(time * 0.7));
	const b = 120;

	t.charColor(r, g, b);

	const col = t.charColor();
	currentR = col.r;
	currentG = col.g;
	currentB = col.b;

	t.push();
	t.char('#');
	t.rotateZ(time * 20);
	t.rect(14, 6);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
