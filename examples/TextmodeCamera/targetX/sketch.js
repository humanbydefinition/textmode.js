/**
 * @title TextmodeCamera.targetX
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

function drawScene(tx) {
	t.push();
	t.char('.');
	t.charColor(50, 70, 110);
	for (let x = -20; x <= 20; x += 4) t.line(x, 0, -20, x, 0, 20);
	for (let z = -20; z <= 20; z += 4) t.line(-20, 0, z, 20, 0, z);
	t.pop();
	// Moving target on X axis
	t.push();
	t.translate(tx, 3, 0);
	t.char('*');
	t.charColor(255, 200, 80);
	t.ellipse(3, 3);
	t.pop();
	// Static reference pillars
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(i * 8, 2, -6);
		t.char('#');
		t.charColor(80, 110, 180);
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
	const tx = Math.sin(time) * 14;
	const cam = t.createCamera().setPosition(0, 10, 30).lookAt(tx, 0, 0);
	targetValue = cam.targetX;

	t.setCamera(cam);
	drawScene(tx);
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TARGETX', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Camera look-at X coordinate.', x, y++, 100, 220, 255);
	drawText('* target pans left and right.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText(`targetX = ${targetValue.toFixed(2)}`, x, y++, 120, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
