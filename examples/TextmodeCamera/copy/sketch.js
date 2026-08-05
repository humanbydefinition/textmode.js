/**
 * @title TextmodeCamera.copy
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let snapshotCam = null;
let useSnapshot = false;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.mousePressed(() => {
	if (snapshotCam) {
		useSnapshot = !useSnapshot;
	}
});

function drawFortress(tm) {
	t.push();
	t.ambientLight(30, 20, 40);
	t.pointLight(255, 180, 100, Math.sin(tm) * 16, 14, Math.cos(tm) * 16);

	t.push();
	t.translate(0, 4, 0);
	t.char('#');
	t.charColor(240, 180, 100);
	t.cellColor(24, 14, 8);
	t.box(10, 8, 10);
	t.pop();

	for (let i = 0; i < 4; i++) {
		const a = (i * Math.PI) / 2;
		t.push();
		t.translate(Math.cos(a) * 7, 7, Math.sin(a) * 7);
		t.charColor(100, 220, 255);
		t.cellColor(10, 20, 35);
		t.char('+');
		t.box(3, 14, 3);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(14, 8, 20);
	const tm = t.frameCount * 0.03;

	const liveCam = t
		.createCamera()
		.setPosition(Math.sin(tm) * 32, 16, Math.cos(tm) * 32)
		.lookAt(0, 4, 0);
	if (!snapshotCam) snapshotCam = liveCam.copy();

	const activeCam = useSnapshot ? snapshotCam : liveCam;
	t.setCamera(activeCam);
	drawFortress(tm);
	t.resetCamera();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const modeText = useSnapshot ? 'FREEZE SNAPSHOT (CLONED)' : 'LIVE ORBIT CAMERA';

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECAMERA.COPY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DUAL-CAMERA FREEZE-FRAME', x, y++);
	t.charColor(140, 160, 190);
	t.print('cam.copy() creates an independent', x, y++);
	t.print('deep clone of camera transformation.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`MODE: ${modeText}`, x, y++);
	t.charColor(255, 200, 100);
	t.print('CLICK CANVAS TO TOGGLE VIEWS', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
