/**
 * @title TextmodeCamera.targetY
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetYVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawAttractorAltars(panY) {
	t.push();
	t.ambientLight(25, 30, 45);
	t.pointLight(255, 210, 60, 0, panY, 12);

	for (let i = -6; i <= 6; i++) {
		const y = i * 4;
		const x = Math.sin(i * 0.5) * 12;
		const z = Math.cos(i * 0.5) * 8;

		t.push();
		t.translate(x, y, z);
		t.charColor(Math.floor(80 + (i + 6) * 14), 255, 160);
		t.cellColor(25, 10, 35);
		t.char('#');
		t.box(6, 3, 6);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(12, 6, 24);
	const tm = t.frameCount * 0.04;
	const panY = Math.sin(tm) * 18;

	const cam = t.createCamera().setPosition(28, 4, 32).lookAt(0, panY, 0);

	targetYVal = cam.targetY;
	t.setCamera(cam);
	drawAttractorAltars(panY);
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
	t.print('TEXTMODECAMERA.TARGETY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: AIZAWA 3D ALTAR PAN SCAN', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera lookAt target Y coord.', x, y++);
	t.print('Point light tracks vertical Y target.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 210, 60);
	t.print(`TARGET Y: ${targetYVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
