/**
 * @title TextmodeCamera.targetY
 */
const t = textmode.create({
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

function drawScene(ty) {
	t.push();
	t.char('.');
	t.charColor(50, 70, 110);
	for (let x = -20; x <= 20; x += 4) t.line(x, 0, -20, x, 0, 20);
	for (let z = -20; z <= 20; z += 4) t.line(-20, 0, z, 20, 0, z);
	t.pop();
	// Target rising and falling on Y axis
	t.push();
	t.translate(0, ty, 0);
	t.char('*');
	t.charColor(255, 180, 255);
	t.ellipse(3, 3);
	t.pop();
	// Tall pillar as vertical reference
	t.push();
	t.translate(0, 8, -6);
	t.char('|');
	t.charColor(80, 110, 180);
	t.box(2, 16, 2);
	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	const ty = Math.sin(time) * 10;
	const cam = t.createCamera().setPosition(0, 10, 30).lookAt(0, ty, 0);
	targetValue = cam.targetY;

	t.setCamera(cam);
	drawScene(ty);
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TARGETY', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Camera look-at Y coordinate.', x, y++, 100, 220, 255);
	drawText('* target rises and falls on Y.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`targetY = ${targetValue.toFixed(2)}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
