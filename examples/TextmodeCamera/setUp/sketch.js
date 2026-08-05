/**
 * @title TextmodeCamera.setUp
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let upXVal = 0,
	upYVal = 0;

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

function drawSpaceStation() {
	t.push();
	t.char('#');
	t.charColor(120, 240, 255);
	t.cellColor(10, 24, 40);
	t.box(6, 6, 6);
	t.char('+');
	t.charColor(255, 200, 100);
	t.box(16, 2, 16);
	t.pop();
}

t.draw(() => {
	t.background(4, 6, 14);
	const tm = t.frameCount * 0.03;
	upXVal = Math.cos(tm);
	upYVal = Math.sin(tm);

	const cam = t.createCamera().setPosition(0, 0, 32).lookAt(0, 0, 0).setUp(upXVal, upYVal, 0);

	t.setCamera(cam);
	drawSpaceStation();
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
	t.print('TEXTMODECAMERA.SETUP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: SPACE STATION STABILIZER', x, y++);
	t.charColor(140, 160, 190);
	t.print('cam.setUp(x, y, z) defines orientation', x, y++);
	t.print('vector for camera up direction.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`UP VECTOR: [${upXVal.toFixed(2)}, ${upYVal.toFixed(2)}, 0.00]`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
