/**
 * @title TextmodeColor.creation
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

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

	drawCenteredText('TextmodeColor.creation', -6, [240, 245, 255]);

	const col1 = t.color(255, 120, 80);
	t.push();
	t.translate(-6, 0);
	t.charColor(col1.r, col1.g, col1.b);

	const label1 = 'RGB: 255, 120, 80';
	for (let i = 0; i < label1.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label1[i]);
		t.point();
		t.pop();
	}
	t.pop();

	const col2 = t.color('#80FFB0');
	t.push();
	t.translate(-6, 4);
	t.charColor(col2.r, col2.g, col2.b);

	const label2 = 'Hex: #80FFB0';
	for (let i = 0; i < label2.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label2[i]);
		t.point();
		t.pop();
	}
	t.pop();

	const col3 = t.color(180);
	t.push();
	t.translate(-6, 8);
	t.charColor(col3.r, col3.g, col3.b);

	const label3 = 'Gray: 180';
	for (let i = 0; i < label3.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label3[i]);
		t.point();
		t.pop();
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
