/**
 * @title TextmodeCamera.eyeY
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeYVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawTerrarium(tm) {
	t.push();
	for (let ring = 4; ring >= 1; ring--) {
		const s = ring * 6;
		const h = (5 - ring) * 3;
		t.push();
		t.translate(0, h * 0.5, 0);
		t.charColor(Math.floor(240 - ring * 35), Math.floor(140 + ring * 25), Math.floor(80 + ring * 30));
		t.cellColor(20, 10, 16);
		t.char('#');
		t.box(s, 2.5, s);
		t.pop();
	}
	t.pop();
}

t.draw(() => {
	t.background(12, 6, 18);
	const tm = t.frameCount * 0.04;
	const altitudeY = Math.sin(tm) * 24 + 18;

	const cam = t.createCamera().setPosition(0, altitudeY, 36).lookAt(0, 4, 0);

	eyeYVal = cam.eyeY;
	t.setCamera(cam);
	drawTerrarium(tm);
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
	t.print('TEXTMODECAMERA.EYEY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: ALTITUDE OVERFLIGHT OVERVIEW', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads camera eye Y world coordinate.', x, y++);
	t.print('Eye sweeps vertically over terrarium.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`EYE Y: ${eyeYVal.toFixed(2)}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
