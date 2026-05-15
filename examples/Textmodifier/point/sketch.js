/**
 * @title Textmodifier.point
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

	const time = t.frameCount * 0.05;

	t.char('.');
	t.charColor(40, 45, 60);
	for (let y = -15; y <= 15; y += 5) {
		for (let x = -30; x <= 30; x += 10) {
			t.push();
			t.translate(x, y);
			t.point();
			t.pop();
		}
	}

	const count = 40;
	for (let i = 0; i < count; i++) {
		const angle = time + i * 0.2;
		const r = i * 0.6;
		const x = Math.cos(angle) * r;
		const y = Math.sin(angle) * r;

		t.push();
		t.translate(x, y);
		t.char(['•', '·', '°', '*'][i % 4]);
		t.charColor(100, 150 + i * 2, 255, (1 - i / count) * 255);
		t.point();
		t.pop();
	}

	let px = 0,
		py = 0;
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		px = t.mouse.x;
		py = t.mouse.y;
	} else {
		px = Math.sin(time * 0.7) * 20;
		py = Math.cos(time * 0.5) * 10;
	}

	t.push();
	t.translate(px, py);
	t.char('☼');
	t.charColor(255, 200, 100);
	t.point();

	t.translate(2, 0);
	t.charColor(255);
	const label = `point(${Math.floor(px)}, ${Math.floor(py)})`;
	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}
	t.pop();

	drawCenteredText('Textmodifier.point', -20, [255, 255, 255]);
	drawCenteredText('Draws the current character and color at the origin.', -18, [150, 170, 200]);

	if (t.mouse.x === Number.NEGATIVE_INFINITY) {
		drawCenteredText('Move mouse to control the tracker', 20, [100, 100, 120]);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
