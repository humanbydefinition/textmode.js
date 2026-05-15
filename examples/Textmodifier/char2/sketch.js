/**
 * @title Textmodifier.char2
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let currentIndex = 0;
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

	drawCenteredText('Textmodifier.char (Index)', -12, [240, 245, 255]);
	drawCenteredText('Selecting glyphs using their numeric index in the font.', -10, [150, 170, 200]);

	drawCenteredText('INDEX SELECTOR', 8, [255, 225, 140]);
	drawCenteredText(
		`INDEX: ${currentIndex.toString().padStart(3, '0')}  RESULT: "${currentChar}"`,
		10,
		[140, 180, 255]
	);

	drawCenteredText('t.char(indexNumber)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.2;
	const count = t.font.characters.length;

	currentIndex = Math.floor(time) % count;
	t.char(currentIndex);

	currentChar = t.char();

	t.push();
	t.charColor(120, 255, 180);
	t.rotateZ(t.frameCount * 3);
	t.rect(12, 12);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
