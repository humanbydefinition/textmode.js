/**
 * @title Textmodifier.createCamera
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let camera;
let eyeX = 0;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
	camera = t.createCamera();
});

t.draw(() => {
	t.background(6, 8, 18);
	const time = t.frameCount * 0.025;
	eyeX = Math.cos(time) * 28;
	camera.setPosition(eyeX, 10, 38).lookAt(0, 0, 0);
	t.setCamera(camera);
	t.ambientLight(25, 28, 36);
	t.pointLight([255, 210, 140], { x: 18, y: -16, z: 28 });
	t.rotateY(time * 25);
	t.char('@');
	t.charColor(140, 220, 255);
	t.sphere(6);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.CREATECAMERA', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MUTABLE CAMERA', x, y++, 100, 220, 255);
	drawText('createCamera returns an object.', x, y++, 140, 160, 190);
	drawText('setCamera applies its state.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`EYE X: ${eyeX.toFixed(1)}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
