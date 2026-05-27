/**
 * @title TextmodeCamera.lookAt
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let tx = 0,
	ty = 0,
	tz = 0;

function drawText(text, x, y, r = 200, g = 220, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

function drawScene() {
	t.push();
	t.char('.');
	t.charColor(50, 70, 110);
	for (let x = -20; x <= 20; x += 4) t.line(x, 0, -20, x, 0, 20);
	for (let z = -20; z <= 20; z += 4) t.line(-20, 0, z, 20, 0, z);
	t.pop();
	// Target marker: a glowing cross at the look-at point
	t.push();
	t.translate(tx, ty, tz);
	t.char('*');
	t.charColor(255, 220, 80);
	t.ellipse(3, 3);
	t.pop();
	// Static pillars around the scene
	for (let i = 0; i < 4; i++) {
		const angle = (i * Math.PI) / 2;
		t.push();
		t.translate(Math.cos(angle) * 12, 3, Math.sin(angle) * 12);
		t.char('#');
		t.charColor(80, 120, 200);
		t.box(2, 6, 2);
		t.pop();
	}
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	tx = Math.cos(time) * 10;
	ty = Math.sin(time * 0.7) * 4;
	tz = Math.sin(time) * 10;

	const cam = t.createCamera().setPosition(0, 12, 30).lookAt(tx, ty, tz);
	t.setCamera(cam);
	drawScene();
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LOOKAT', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Aim the camera at a 3D point.', x, y++, 100, 220, 255);
	drawText('* marker shows the look target.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	const target = `${tx.toFixed(1)},${ty.toFixed(1)},${tz.toFixed(1)}`;
	drawText(`TARGET: ${target}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
