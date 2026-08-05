/**
 * @title TextmodeCamera.targetZ
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetDepth = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawSubaquaticTunnel(tz) {
	t.push();
	t.ambientLight(15, 30, 45);
	t.pointLight(0, 220, 240, 0, 0, tz);

	for (let z = -28; z <= 28; z += 7) {
		t.push();
		t.translate(0, 0, z);
		const dist = Math.abs(z - tz);
		const bright = Math.max(0, 1 - dist / 20);
		t.charColor(Math.floor(20 + bright * 80), Math.floor(140 + bright * 115), Math.floor(180 + bright * 75));
		t.cellColor(4, 16, 28);
		t.char(dist < 5 ? 'O' : 'o');
		t.ellipse(14, 10);
		t.pop();
	}

	t.push();
	t.translate(0, 0, tz);
	t.charColor(140, 255, 240);
	t.cellColor(10, 40, 60);
	t.char('*');
	t.box(4, 4, 1);
	t.pop();
	t.pop();
}

t.draw(() => {
	t.background(4, 12, 22);
	const tm = t.frameCount * 0.03;
	const tz = Math.sin(tm) * 20;

	const cam = t.createCamera().setPosition(18, 12, 38).lookAt(0, 0, tz);
	targetDepth = cam.targetZ;

	t.setCamera(cam);
	drawSubaquaticTunnel(tz);
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
	t.charColor(120, 240, 220);
	t.print('TEXTMODECAMERA.TARGETZ', x, y++);
	t.charColor(60, 90, 130);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SUBAQUATIC DEPTH SCANNER', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera look-at Z target.', x, y++);
	t.print('Point light tracks focal depth ring.', x, y++);
	t.charColor(60, 90, 130);
	t.print('------------------------------------', x, y++);
	t.charColor(120, 255, 220);
	t.print(`TARGET Z: ${targetDepth.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
