/**
 * @title TextmodeCamera.eyeX
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeXVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawScene(tm, sweepX) {
	t.push();
	t.ambientLight(30, 40, 70);
	t.pointLight(255, 200, 150, sweepX * 0.5, 16, 20);

	for (let x = -24; x <= 24; x += 8) {
		for (let z = -24; z <= 24; z += 8) {
			const h = Math.floor((Math.sin(x * 0.15 + z * 0.15 + tm) * 0.5 + 0.5) * 12 + 4);
			t.push();
			t.translate(x, h * 0.5, z);
			t.charColor(Math.floor(80 + (x + 24) * 3.5), 180, Math.floor(240 - (z + 24) * 3.5));
			t.cellColor(10, 18, 32);
			t.char('#');
			t.box(4, h, 4);
			t.pop();
		}
	}
	t.pop();
}

t.draw(() => {
	t.background(8, 10, 24);
	const tm = t.frameCount * 0.04;
	const sweepX = Math.sin(tm) * 32;

	const cam = t.createCamera().setPosition(sweepX, 14, 38).lookAt(0, 4, 0);

	eyeXVal = cam.eyeX;
	t.setCamera(cam);
	drawScene(tm, sweepX);
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
	t.print('TEXTMODECAMERA.EYEX', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: LIT MONOLITH LATERAL SWEEP', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera eye X world coordinate.', x, y++);
	t.print('Point light illuminates 3D monoliths.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`EYE X: ${eyeXVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
