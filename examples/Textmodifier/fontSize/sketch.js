/**
 * @title Textmodifier.fontSize
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const sizes = [8, 16, 32];
let sizeIndex = 1;

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
	t.background(6, 10, 22);

	const currentSize = t.fontSize();
	const time = t.frameCount * 0.03;

	t.push();
	t.charColor(15, 24, 42);
	t.char('.');
	t.rect(t.grid.cols, t.grid.rows);
	t.pop();

	t.push();
	t.charColor(255, 180, 100);
	t.cellColor(40, 65, 140);
	t.char('#');
	t.rotateZ(time * 80);
	t.rect(6, 6);
	t.pop();

	for (let i = 0; i < 4; i++) {
		const angle = time + (i / 4) * Math.PI * 2;
		t.push();
		t.translate(Math.round(Math.cos(angle) * 5), Math.round(Math.sin(angle) * 5));
		t.charColor(100 + i * 50, 200, 255 - i * 30);
		t.char('*');
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.fontSize', -12, [240, 245, 255]);
	drawCenteredText('Setting and retrieving the current font size.', -10, [150, 170, 200]);

	drawCenteredText(`t.fontSize() = ${currentSize}px  |  Grid: ${t.grid.cols}x${t.grid.rows}`, -6, [140, 180, 255]);

	drawCenteredText('click to cycle: 8 / 16 / 32', 11, [80, 90, 120]);
});

t.mouseClicked(() => {
	sizeIndex = (sizeIndex + 1) % sizes.length;
	t.fontSize(sizes[sizeIndex]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
