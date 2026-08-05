/**
 * @title TextmodeCamera.eyeZ
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeZVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawTunnel(tm) {
	t.push();
	for (let i = 0; i < 10; i++) {
		const zPos = i * -12;
		const s = 12 + i * 2;
		t.push();
		t.translate(0, 0, zPos);
		t.charColor(Math.floor(80 + i * 15), Math.floor(120 + i * 12), Math.floor(255 - i * 18));
		t.cellColor(12, 8, 24);
		t.char('#');
		t.box(s, s, 2);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(10, 6, 20);
	const tm = t.frameCount * 0.04;
	const zoomZ = Math.cos(tm) * 40 + 50;

	const cam = t.createCamera().setPosition(0, 0, zoomZ).lookAt(0, 0, -40);

	eyeZVal = cam.eyeZ;
	t.setCamera(cam);
	drawTunnel(tm);
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
	t.print('TEXTMODECAMERA.EYEZ', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: DEPTH ZOOM TUNNEL CORRIDOR', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera eye Z world coordinate.', x, y++);
	t.print('Eye zooms forward/backward on Z axis.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`EYE Z: ${eyeZVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
