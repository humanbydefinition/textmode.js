/**
 * @title TextmodeCamera.eyeY
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeValue = 0;

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
	t.push();
	t.translate(0, 4, 0);
	t.char('+');
	t.charColor(180, 120, 255);
	t.box(6, 8, 6);
	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	// Camera rises and falls along the Y axis
	const camY = 8 + Math.sin(t.frameCount * 0.02) * 12;
	const cam = t.createCamera().setPosition(0, camY, 28).lookAt(0, 0, 0);

	eyeValue = cam.eyeY;
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

	drawText('EYEY', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Camera eye Y position (up/down).', x, y++, 100, 220, 255);
	drawText('Camera rises and falls on Y axis.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`eyeY = ${eyeValue.toFixed(2)}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
