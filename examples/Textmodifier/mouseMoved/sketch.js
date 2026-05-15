/**
 * @title Textmodifier.mouseMoved
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

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

	// Full-screen Magnetic Field Effect
	const stepX = 6;
	const stepY = 3;
	const halfCols = Math.floor(t.grid.cols / 2);
	const halfRows = Math.floor(t.grid.rows / 2);

	t.charColor(60, 70, 100);
	for (let y = -halfRows; y <= halfRows; y += stepY) {
		for (let x = -halfCols; x <= halfCols; x += stepX) {
			t.push();
			t.translate(x, y);

			if (isInside) {
				const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
				const influence = Math.max(0, 1.0 - dist / 30);

				const angle = Math.atan2(my - y, mx - x) * (180 / Math.PI);
				t.rotateZ(angle);

				t.charColor(60 + influence * 100, 70 + influence * 150, 100 + influence * 155);
				t.char(influence > 0.5 ? '»' : '›');
			} else {
				t.char('·');
			}

			t.point();
			t.pop();
		}
	}

	if (isInside) {
		t.push();
		t.translate(mx, my);
		t.char('☼');
		t.charColor(255, 255, 255);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.mouseMoved', -22, [255, 255, 255]);
	drawCenteredText('Fires whenever the mouse moves.', -20, [150, 170, 200]);
	drawCenteredText('Use for hover or proximity effects.', -18, [150, 170, 200]);

	if (!isInside) {
		drawCenteredText('Move mouse to attract the field', 18, [100, 150, 255]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
