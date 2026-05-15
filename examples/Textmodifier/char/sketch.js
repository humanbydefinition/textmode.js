/**
 * @title Textmodifier.char
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let currentChar = '';

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

	drawCenteredText('Textmodifier.char', -12, [240, 245, 255]);
	drawCenteredText('Assigning glyphs via strings and querying state.', -10, [150, 170, 200]);

	drawCenteredText('GETTER READOUT', 8, [140, 255, 180]);
	drawCenteredText(`ACTIVE_CHAR: "${currentChar}"`, 10, [140, 180, 255]);

	drawCenteredText('t.char(string)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const cycle = Math.floor(t.frameCount / 60) % 3;
	const charSet = ['@', '#', 'X'];

	t.char(charSet[cycle]);

	currentChar = t.char();

	t.push();
	t.charColor(255, 180, 100);
	t.rotateZ(t.frameCount * 2);
	t.rect(14, 14);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
