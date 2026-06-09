/**
 * @title Textmodifier.setCamera
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let cameraA;
let cameraB;
let active = false;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
	cameraA = t.createCamera();
	cameraA.setPosition(-28, 10, 36).lookAt(0, 0, 0);
	cameraB = t.createCamera();
	cameraB.setPosition(28, 10, 36).lookAt(0, 0, 0);
});

t.draw(() => {
	t.background(6, 8, 18);
	active = Math.floor(t.frameCount / 120) % 2 === 0;
	t.setCamera(active ? cameraA : cameraB);
	t.ambientLight(25, 28, 36);
	t.pointLight([255, 210, 140], { x: 18, y: -16, z: 28 });
	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 9, 0, i * -8);
		t.rotateY(t.frameCount + i * 30);
		t.char('#');
		t.charColor(120 + i * 40, 220, 255 - i * 20);
		t.box(5, 5, 5);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.SETCAMERA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ACTIVATE CAMERA', x, y++, 100, 220, 255);
	drawText('Two camera objects alternate.', x, y++, 140, 160, 190);
	drawText('Scene proves viewpoint change.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(active ? 'ACTIVE: CAMERA A' : 'ACTIVE: CAMERA B', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
