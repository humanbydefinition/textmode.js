/**
 * @title TextmodeLayer.ortho
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ['.', ':', '=', '#', '%'];
const scene = t.layers.add();
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			t.push();
			t.translate(x, y);
			t.charColor(20, 30, 55);
			t.cellColor(6, 10, 22);
			t.char('.');
			t.point();
			t.pop();
		}
	}
	scene.ortho();
	scene.camera(30, 24, 30);
});

scene.draw(() => {
	t.clear();
	const tm = t.frameCount * 0.03;
	t.push();
	t.ambientLight(25, 35, 60);
	t.pointLight(255, 200, 140, Math.sin(tm) * 15, 20, 20);

	for (let x = -16; x <= 16; x += 8) {
		for (let z = -16; z <= 16; z += 8) {
			const norm = Math.sin(x * 0.2 + z * 0.2 + tm) * 0.5 + 0.5;
			const h = Math.floor(norm * 10 + 4);
			const idx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

			t.push();
			t.translate(x, h * 0.5, z);
			t.charColor(Math.floor(40 + norm * 140), Math.floor(180 + norm * 60), Math.floor(220 - norm * 80));
			t.cellColor(10, 20, 38);
			t.char(RAMP[idx]);
			t.box(4, h, 4);
			t.pop();
		}
	}
	t.pop();
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
	t.print('TEXTMODELAYER.ORTHO', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ISOMETRIC ARCHITECTURAL MATRIX', x, y++);
	t.charColor(140, 160, 190);
	t.print('Enables orthographic layer projection.', x, y++);
	t.print('Objects retain scale regardless of depth.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print('PROJECTION: PARALLEL ORTHOGRAPHIC', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
