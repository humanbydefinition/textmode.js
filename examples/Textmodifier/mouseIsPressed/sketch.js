/**
 * @title Textmodifier.mouseIsPressed
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let charge = 0;

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

	const mx = t.mouse.x;
	const my = t.mouse.y;
	const isInside = mx !== Number.NEGATIVE_INFINITY;

	if (t.mouseIsPressed && isInside) {
		charge = Math.min(1.0, charge + 0.05);
	} else {
		charge = Math.max(0, charge - 0.02);
	}

	if (isInside) {
		t.push();
		t.translate(mx, my);
		const size = 5 + charge * 20;
		t.charColor(255, 200, 100, charge * 255);
		t.char('☼');
		t.ellipse(size, size);
		t.char(t.mouseIsPressed ? '@' : '+');
		t.charColor(255, 255, 255);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.mouseIsPressed', -20, [255, 255, 255]);
	drawCenteredText('Boolean state: true if any button is held.', -18, [150, 170, 200]);
	drawCenteredText('Checked every frame in the draw loop.', -16, [150, 170, 200]);

	drawCenteredText(`mouseIsPressed = ${t.mouseIsPressed}`, 10, t.mouseIsPressed ? [100, 255, 150] : [255, 100, 100]);
	drawCenteredText('Hold Click to "Charge" the cursor', 18, [255, 200, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
