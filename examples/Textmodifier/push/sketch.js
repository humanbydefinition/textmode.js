/**
 * @title Textmodifier.push
 * @description Transform stack observatory: each push creates a local drawing space, so orbiting forms can move independently without disturbing the scene.
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function label(text, x, y, color = [180, 190, 210]) {
	t.push();
	t.translate(x, y);
	t.charColor(color[0], color[1], color[2]);

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
	t.background(5, 7, 13);

	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const time = t.frameCount * 0.025;

	label('push() saves the current transform', -Math.floor(cols / 2) + 4, -Math.floor(rows / 2) + 4, [230, 235, 245]);
	label(
		'each orbit draws in its own temporary coordinate system',
		-Math.floor(cols / 2) + 4,
		-Math.floor(rows / 2) + 6,
		[140, 155, 180]
	);

	t.charColor(35, 45, 70);
	for (let y = -Math.floor(rows / 2) + 10; y < Math.floor(rows / 2) - 4; y += 3) {
		for (let x = -Math.floor(cols / 2) + 4; x < Math.floor(cols / 2) - 4; x += 8) {
			t.push();
			t.translate(x, y);
			t.char('.');
			t.point();
			t.pop();
		}
	}

	t.push();
	t.rotateZ(time * 8);
	t.char('@');
	t.charColor(255, 235, 150);
	t.rect(6, 6);

	for (let ring = 0; ring < 4; ring++) {
		t.push();
		t.rotateZ(time * (20 + ring * 11));

		for (let i = 0; i < 10; i++) {
			const angle = (i / 10) * Math.PI * 2;

			t.push();
			t.translate(Math.cos(angle) * (8 + ring * 5) * 1.6, Math.sin(angle) * (8 + ring * 5));
			t.rotateZ(-time * (30 + ring * 8));
			t.char(['+', '*', 'o', '#'][ring]);
			t.charColor(80 + ring * 42, 210 - ring * 20, 255 - ring * 35, 185);
			t.rect(2 + ring, 2 + ring);
			t.pop();
		}

		t.pop();
	}

	t.pop();

	label('pop() restores the parent transform', -Math.floor(cols / 2) + 4, Math.floor(rows / 2) - 4, [245, 190, 100]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
