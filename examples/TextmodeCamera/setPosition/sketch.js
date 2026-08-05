/**
 * @title TextmodeCamera.setPosition
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let curPos = { x: 0, y: 0, z: 0 };

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawMonument(tm, eyeX, eyeY, eyeZ) {
	t.push();
	t.ambientLight(60, 80, 120);
	t.pointLight(255, 220, 160, eyeX, eyeY + 8, eyeZ);
	t.pointLight(100, 200, 255, Math.sin(tm * 2) * 20, 24, Math.cos(tm * 2) * 20);

	for (let ring = 3; ring >= 1; ring--) {
		const r = ring * 6;
		t.push();
		t.translate(0, (4 - ring) * 3, 0);
		t.charColor(100 + ring * 40, 200, 255 - ring * 20);
		t.cellColor(12, 22, 38);
		t.char('+');
		t.box(r, 2.5, r);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(8, 10, 24);
	const tm = t.frameCount * 0.03;

	const eyeX = Math.sin(tm) * 30;
	const eyeY = Math.cos(tm * 0.7) * 15 + 10;
	const eyeZ = Math.cos(tm) * 30;

	curPos = { x: eyeX, y: eyeY, z: eyeZ };

	const cam = t.createCamera().setPosition(eyeX, eyeY, eyeZ).lookAt(0, 4, 0);

	t.setCamera(cam);
	drawMonument(tm, eyeX, eyeY, eyeZ);
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECAMERA.SETPOSITION', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HARMONIC LISSAJOUS ORBIT', x, y++);
	t.charColor(140, 160, 190);
	t.print('cam.setPosition(x, y, z) explicitly', x, y++);
	t.print('sets camera eye world coordinates.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`EYE: [${curPos.x.toFixed(1)}, ${curPos.y.toFixed(1)}, ${curPos.z.toFixed(1)}]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
