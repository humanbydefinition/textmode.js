/**
 * @title TextmodeCamera.setPosition
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let px = 0,
	py = 0,
	pz = 0;

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
	// Central subject
	t.push();
	t.translate(0, 4, 0);
	t.char('@');
	t.charColor(120, 220, 255);
	t.box(5, 8, 5);
	t.pop();
	// Corner pillars
	for (let i = 0; i < 4; i++) {
		const a = (i * Math.PI) / 2 + Math.PI / 4;
		t.push();
		t.translate(Math.cos(a) * 12, 2, Math.sin(a) * 12);
		t.char('#');
		t.charColor(80, 100, 160);
		t.box(2, 4, 2);
		t.pop();
	}
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	// Camera orbits the scene on the XZ plane
	const time = t.frameCount * 0.02;
	px = Math.cos(time) * 24;
	py = 8;
	pz = Math.sin(time) * 24;

	const cam = t.createCamera().setPosition(px, py, pz).lookAt(0, 0, 0);
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

	drawText('SETPOSITION', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Place the camera eye in 3D space.', x, y++, 100, 220, 255);
	drawText('Camera orbits the central object.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	const pos = `${px.toFixed(1)},${py.toFixed(1)},${pz.toFixed(1)}`;
	drawText(`POS: ${pos}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
