/**
 * @title Textmodifier.flipX
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

	const rows = 10;
	const time = t.frameCount * 0.04;

	// Gently rock the whole field to contrast normal vs mirrored rows
	t.push();
	t.rotateZ(Math.sin(time * 0.4) * 6);

	for (let i = 0; i < rows; i++) {
		const phase = i / (rows - 1);
		const y = (phase - 0.5) * t.grid.rows * 0.75;
		const wave = Math.sin(time + i * 0.6) * 5;
		const pulse = 0.6 + 0.4 * Math.sin(time * 2 + i * 0.9);

		t.push();
		t.translate(wave - 4, y);
		t.charColor(Math.round(180 + 75 * pulse), Math.round(180 + 75 * pulse), 100);
		t.char('R');
		t.point();
		t.pop();

		t.push();
		t.translate(-wave + 4, y);
		t.flipX(true);
		t.charColor(Math.round(180 + 75 * pulse), 100, Math.round(180 + 75 * pulse));
		t.char('R');
		t.point();
		t.pop();

		if (i % 2 === 0) {
			t.push();
			t.translate(wave * 2 - 12, y);
			t.charColor(100, Math.round(180 + 75 * pulse), 80);
			t.char('R');
			t.point();
			t.pop();

			t.push();
			t.translate(-wave * 2 + 12, y);
			t.flipX(true);
			t.charColor(100, 80, Math.round(180 + 75 * pulse));
			t.char('R');
			t.point();
			t.pop();
		}
	}

	t.pop();

	drawCenteredText('Textmodifier.flipX', -14, [240, 245, 255]);
	drawCenteredText('Mirroring glyphs horizontally.', -12, [150, 170, 200]);
	drawCenteredText('t.flipX(false)  original  |  t.flipX(true)  mirrored', -10, [255, 200, 100]);

	drawCenteredText(`t.flipX() = ${t.flipX()}`, 12, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
