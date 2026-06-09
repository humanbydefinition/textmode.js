/**
 * @title TextmodeCamera.setUp
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let ux = 0,
	uy = 1,
	uz = 0;

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
	t.charColor(60, 80, 120);
	for (let x = -20; x <= 20; x += 4) t.line(x, 0, -20, x, 0, 20);
	for (let z = -20; z <= 20; z += 4) t.line(-20, 0, z, 20, 0, z);
	t.pop();
	t.push();
	t.translate(0, 5, 0);
	t.char('#');
	t.charColor(200, 220, 255);
	t.box(4, 10, 4);
	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.03;
	const cam = t.createCamera().setPosition(0, 10, 40).lookAt(0, 0, 0);
	// Oscillating the X component of 'up' creates a rolling tilt
	cam.setUp(Math.sin(time) * 1.5, 1, 0);

	ux = cam.upX;
	uy = cam.upY;
	uz = cam.upZ;
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

	drawText('SETUP', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Set the camera up vector.', x, y++, 100, 220, 255);
	drawText('Tilting upX rolls the horizon.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	const up = `${ux.toFixed(2)},${uy.toFixed(2)},${uz.toFixed(2)}`;
	drawText(`UP: ${up}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
