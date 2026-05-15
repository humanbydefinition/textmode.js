/**
 * @title Textmodifier.translate
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

	const time = t.frameCount * 0.03;
	const radius = 15;

	const count = 12;
	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2 + time;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle * 0.5) * radius * 0.5;
		const z = Math.sin(angle) * radius;

		t.push();
		t.translate(x, y, z);

		const alpha = 100 + (z / radius) * 155;
		t.charColor(100, 200, 255, alpha);
		t.char('☼');
		t.point();

		if (i === 0) {
			t.push();
			t.translate(2, 0);
			t.charColor(255, 255, 255, alpha);
			const coordText = `(${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`;
			for (let j = 0; j < coordText.length; j++) {
				t.push();
				t.translate(j, 0);
				t.char(coordText[j]);
				t.point();
				t.pop();
			}
			t.pop();
		}
		t.pop();
	}

	drawCenteredText('Textmodifier.translate', -12, [255, 255, 255]);
	drawCenteredText('Moves the coordinate system by (x, y, z) cells.', -10, [150, 170, 200]);
	drawCenteredText('t.translate(x, y, z)', 10, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
