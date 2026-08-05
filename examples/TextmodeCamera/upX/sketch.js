/**
 * @title TextmodeCamera.upX
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let upXVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawHorizon() {
	t.push();
	t.char('.');
	t.charColor(60, 100, 180);
	for (let x = -24; x <= 24; x += 6) {
		for (let z = -24; z <= 24; z += 6) {
			t.push();
			t.translate(x, 0, z);
			t.charColor(x === 0 ? 255 : 80, 220, z === 0 ? 255 : 140);
			t.cellColor(10, 14, 28);
			t.char('+');
			t.box(4, 0.5, 4);
			t.pop();
		}
	}
	t.pop();
}

t.draw(() => {
	t.background(10, 10, 24);
	const tm = t.frameCount * 0.04;
	const rollX = Math.sin(tm);

	const cam = t.createCamera().setPosition(0, 12, 32).lookAt(0, 0, 0).setUp(rollX, 1, 0);

	upXVal = cam.upX;
	t.setCamera(cam);
	drawHorizon();
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
	t.print('TEXTMODECAMERA.UPX', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ROLLING FLIGHT HORIZON', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads up-vector X component.', x, y++);
	t.print('Modulating upX rolls camera view.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`UP X: ${upXVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
