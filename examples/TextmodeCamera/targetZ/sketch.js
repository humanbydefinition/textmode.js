/**
 * @title TextmodeCamera.targetZ
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetValue = 0;

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

function drawScene(tz) {
	t.push();
	t.char('.');
	t.charColor(50, 70, 110);
	for (let x = -20; x <= 20; x += 4) t.line(x, 0, -20, x, 0, 20);
	for (let z = -20; z <= 20; z += 4) t.line(-20, 0, z, 20, 0, z);
	t.pop();
	// Target moving along the Z (depth) axis
	t.push();
	t.translate(0, 3, tz);
	t.char('*');
	t.charColor(80, 255, 200);
	t.ellipse(3, 3);
	t.pop();
	// Row of depth markers along Z
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(0, 2, i * 7);
		t.char('#');
		t.charColor(80, 110, 160);
		t.box(2, 4, 2);
		t.pop();
	}
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	const tz = Math.sin(time) * 12;
	const cam = t.createCamera().setPosition(16, 12, 30).lookAt(0, 0, tz);
	targetValue = cam.targetZ;

	t.setCamera(cam);
	drawScene(tz);
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TARGETZ', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Camera look-at Z coordinate.', x, y++, 100, 220, 255);
	drawText('* target moves in depth on Z.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`targetZ = ${targetValue.toFixed(2)}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
