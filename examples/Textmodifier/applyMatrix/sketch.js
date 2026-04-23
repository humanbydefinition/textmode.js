/**
 * @title Textmodifier.applyMatrix
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function trsMatrixY(angle, tx, ty, tz, sx, sy, sz) {
	const c = Math.cos(angle);
	const s = Math.sin(angle);

	return new Float32Array([
		c * sx,
		0,
		-s * sx,
		0,
		0,
		sy,
		0,
		0,
		s * sz,
		0,
		c * sz,
		0,
		tx,
		ty,
		tz,
		1,
	]);
}

function drawLabel(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
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

t.setup(() => {
	t.perspective(60, 0.1, 4096);
	const camera = t.createCamera();
	camera.setPosition(0, 6, 54).lookAt(0, 0, 0);
	t.setCamera(camera);
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(5, 7, 18);

	const left = trsMatrixY(time * 1.4, -12, 0, 0, 1.1, 1.1, 1.1);
	t.push();
	t.applyMatrix(left);
	t.char('M');
	t.charColor(255, 140, 120);
	t.box(8, 8, 8);
	t.pop();

	const right = trsMatrixY(time * 2.0, 12, 0, 0, 1.0, 1.0, 1.0);
	t.push();
	t.applyMatrix(right);
	t.scale(1.0 + Math.sin(time * 2.2) * 0.2);
	t.char('S');
	t.charColor(120, 205, 255);
	t.torus(3.2, 1.3);
	t.pop();

	drawLabel('applyMatrix() + scale()', -Math.floor(t.grid.rows * 0.36), [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
