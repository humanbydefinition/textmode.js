/**
 * @title TextmodeCamera.upZ
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let upZVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawHelixVortex(tm) {
	t.push();
	t.ambientLight(30, 15, 30);
	t.pointLight(255, 50, 150, 0, 0, 16);

	for (let i = -12; i <= 12; i++) {
		const angle = i * 0.4 + tm * 2;
		const x = Math.cos(angle) * 14;
		const y = Math.sin(angle) * 14;
		const z = i * 2;

		t.push();
		t.translate(x, y, z);
		t.charColor(255, Math.floor(50 + (i + 12) * 8), Math.floor(150 - (i + 12) * 4));
		t.cellColor(30, 8, 25);
		t.char('O');
		t.box(3, 3, 3);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(24, 6, 20);
	const tm = t.frameCount * 0.04;
	const tiltZ = Math.sin(tm) * 0.8;

	const cam = t
		.createCamera()
		.setPosition(0, 0, 42)
		.lookAt(0, 0, 0)
		.setUp(0, Math.cos(tm) * 0.8, tiltZ);

	upZVal = cam.upZ;
	t.setCamera(cam);
	drawHelixVortex(tm);
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
	t.print('TEXTMODECAMERA.UPZ', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HELICAL VORTEX Z-AXIS ROTOR', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera up-vector Z component.', x, y++);
	t.print('Tilts camera Z-up orientation.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 50, 150);
	t.print(`UP Z: ${upZVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
