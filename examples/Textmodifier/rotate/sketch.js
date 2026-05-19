/**
 * @title Textmodifier.rotate
 * @description Real-time 3D Mesh Rotation: demonstrates multi-axis coordinate rotation using native 3D geometry primitives—drawing a 3D Box, Torus, and Cylinder rotating at custom speeds on different axes.
 * @author antigravity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawText(text, x, y, r = 180, g = r, b = r) {
	t.push();
	t.translate(x - Math.floor(text.length / 2), y);
	t.charColor(r, g, b);
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
	t.background(6, 8, 14);

	const cols = t.grid.cols;
	const rows = t.grid.rows;

	// Title Info
	drawText('NATIVE 3D ASCII ENGINE VIEWPORT', 0, -Math.floor(rows / 2) + 4, 100, 200, 255);
	drawText(
		'Three-dimensional primitives rotating dynamically on multi-axes',
		0,
		-Math.floor(rows / 2) + 6,
		120,
		140,
		160
	);

	const time = t.frameCount;
	const spacing = Math.floor(cols / 4);

	// Shape 1: 3D Box (Left)
	t.push();
	t.translate(-spacing, 2);
	t.rotate(time * 0.8, time * 0.5, 0);
	t.char('▒');
	t.charColor(255, 120, 100);
	t.box(10, 10, 10);
	t.pop();
	drawText('3D BOX', -spacing, 10, 255, 120, 100);

	// Shape 2: 3D Torus (Center)
	t.push();
	t.translate(0, 2);
	t.rotate(time, 0, time * 0.6);
	t.char('█');
	t.charColor(100, 255, 180);
	t.torus(8, 3);
	t.pop();
	drawText('3D TORUS', 0, 10, 100, 255, 180);

	// Shape 3: 3D Cylinder (Right)
	t.push();
	t.translate(spacing, 2);
	t.rotate(0, time * 1.2, time * 0.4);
	t.char('░');
	t.charColor(100, 180, 255);
	t.cylinder(6, 12);
	t.pop();
	drawText('3D CYLINDER', spacing, 10, 100, 180, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
