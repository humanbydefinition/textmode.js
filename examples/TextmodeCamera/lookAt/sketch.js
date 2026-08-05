/**
 * @title TextmodeCamera.lookAt
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let bx = 0,
	by = 0,
	bz = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawBeaconField(bx, by, bz) {
	t.push();
	for (let i = -2; i <= 2; i++) {
		t.push();
		t.translate(i * 12, 6, -10);
		t.charColor(80, 140, 240);
		t.cellColor(8, 14, 28);
		t.char('#');
		t.box(4, 12, 4);
		t.pop();
	}
	t.push();
	t.translate(bx, by, bz);
	t.charColor(120, 255, 180);
	t.cellColor(20, 40, 20);
	t.char('@');
	t.box(3, 3, 3);
	t.pop();
	t.pop();
}

t.draw(() => {
	t.background(6, 12, 24);
	const tm = t.frameCount * 0.04;
	bx = Math.sin(tm) * 18;
	by = Math.cos(tm * 0.7) * 8 + 6;
	bz = Math.sin(tm * 0.5) * 12;

	const cam = t.createCamera().setPosition(0, 12, 38).lookAt(bx, by, bz);

	t.setCamera(cam);
	drawBeaconField(bx, by, bz);
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
	t.print('TEXTMODECAMERA.LOOKAT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: TARGET LOCK TRACKING BEACON', x, y++);
	t.charColor(140, 160, 190);
	t.print('cam.lookAt(x, y, z) locks camera', x, y++);
	t.print('view frustum onto moving target.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TARGET: [${bx.toFixed(1)}, ${by.toFixed(1)}, ${bz.toFixed(1)}]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
