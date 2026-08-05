/**
 * @title TextmodeCamera.upY
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ['.', ':', '=', '#', '%'];
const labelLayer = t.layers.add();
let upVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawScene(tm) {
	t.push();
	t.ambientLight(25, 35, 60);
	t.pointLight(255, 200, 140, Math.sin(tm) * 20, 18, 25);

	for (let x = -24; x <= 24; x += 8) {
		for (let z = -24; z <= 24; z += 8) {
			const norm = Math.sin(x * 0.15 + z * 0.15 + tm) * 0.5 + 0.5;
			const h = Math.floor(norm * 12 + 4);
			const rIdx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

			t.push();
			t.translate(x, h * 0.5, z);
			t.charColor(Math.floor(40 + norm * 140), Math.floor(160 + norm * 80), Math.floor(220 - norm * 60));
			t.cellColor(10, 18, 36);
			t.char(RAMP[rIdx]);
			t.box(4, h, 4);
			t.pop();
		}
	}
	t.pop();
}

t.draw(() => {
	t.background(6, 10, 24);
	const tm = t.frameCount * 0.03;
	const rollY = Math.sin(tm * 0.8) * 1.5;

	const cam = t.createCamera().setPosition(36, 12, 36).lookAt(0, 2, 0);
	cam.setUp(0, rollY, 1);

	upVal = cam.upY;
	t.setCamera(cam);
	drawScene(tm);
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
	t.print('TEXTMODECAMERA.UPY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: GYROSCOPIC HORIZON SWEEP', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera up vector Y component.', x, y++);
	t.print('Oscillating upY banks world horizon.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`UP Y VALUE: ${upVal.toFixed(3)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
