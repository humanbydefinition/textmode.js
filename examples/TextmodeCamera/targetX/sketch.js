/**
 * @title TextmodeCamera.targetX
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetXVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawAltars(panX) {
	t.push();
	t.ambientLight(25, 45, 30);
	t.pointLight(120, 240, 255, panX, 12, 10);

	for (let x = -20; x <= 20; x += 10) {
		t.push();
		t.translate(x, 4, 0);
		t.charColor(Math.floor(100 + (x + 20) * 3.5), 240, 180);
		t.cellColor(8, 24, 16);
		t.char('#');
		t.box(5, 8, 5);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(4, 14, 10);
	const tm = t.frameCount * 0.04;
	const panX = Math.sin(tm) * 24;

	const cam = t.createCamera().setPosition(0, 12, 36).lookAt(panX, 4, 0);

	targetXVal = cam.targetX;
	t.setCamera(cam);
	drawAltars(panX);
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
	t.print('TEXTMODECAMERA.TARGETX', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: LIT 3D ALTAR PAN SCANNER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads look-at target X coordinate.', x, y++);
	t.print('Point light tracks target across altars.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TARGET X: ${targetXVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
