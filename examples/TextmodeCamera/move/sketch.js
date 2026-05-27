/**
 * @title TextmodeCamera.move
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let ex = 0,
	ey = 0,
	ez = 0;

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
	for (let i = 0; i < 5; i++) {
		t.push();
		t.translate(-16 + i * 8, 3, 0);
		t.char(['@', '#', '+', '*', 'O'][i]);
		t.charColor(100 + i * 30, 180, 255 - i * 30);
		t.box(3, 6, 3);
		t.pop();
	}
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	// Start at a fixed position then move() adds an offset
	const cam = t.createCamera().setPosition(0, 8, 30).lookAt(0, 3, 0);
	cam.move(Math.sin(time) * 14, 0, 0);

	ex = cam.eyeX;
	ey = cam.eyeY;
	ez = cam.eyeZ;
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

	drawText('MOVE', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Translate eye by an offset.', x, y++, 100, 220, 255);
	drawText('Shifts position without resetting', x, y++, 140, 160, 190);
	drawText('the look-at target.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	const eye = `${ex.toFixed(1)},${ey.toFixed(1)},${ez.toFixed(1)}`;
	drawText(`EYE: ${eye}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
