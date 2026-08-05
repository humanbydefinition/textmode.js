/**
 * @title TextmodeCamera.move
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let totalDistance = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawHighway(camZ) {
	t.push();
	t.ambientLight(20, 10, 30);
	t.pointLight(255, 100, 200, 0, 10, camZ - 15);

	for (let i = 0; i < 16; i++) {
		const obeliskZ = Math.floor(camZ / 12) * 12 - i * 12;
		t.push();
		t.translate(-14, 4, obeliskZ);
		t.charColor(255, 120, 180);
		t.cellColor(28, 8, 18);
		t.char('#');
		t.box(3, 8, 3);
		t.pop();

		t.push();
		t.translate(14, 4, obeliskZ);
		t.charColor(100, 220, 255);
		t.cellColor(8, 20, 32);
		t.char('#');
		t.box(3, 8, 3);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(14, 4, 18);

	const cam = t
		.createCamera()
		.setPosition(0, 6, totalDistance)
		.lookAt(0, 4, totalDistance - 40);

	cam.move(0, 0, -0.6);
	totalDistance = cam.eyeZ;

	t.setCamera(cam);
	drawHighway(totalDistance);
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
	t.print('TEXTMODECAMERA.MOVE', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: LIT HIGHWAY OBELISK FLYBY', x, y++);
	t.charColor(140, 160, 190);
	t.print('cam.move(dx, dy, dz) translates eye', x, y++);
	t.print('& target together in world space.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`TOTAL Z DISTANCE: ${totalDistance.toFixed(1)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
