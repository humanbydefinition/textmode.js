/**
 * @title TextmodeLayer.createCamera
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let camera;
let camX = 0;
const camY = 8;
const camZ = 46;

t.setup(() => {
	camera = scene.createCamera();
	scene.setCamera(camera);
});

function drawText(text, x, y, color = [200, 220, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(color[0], color[1], color[2]);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

t.draw(() => {
	t.background(8, 10, 18);

	camX = Math.sin(t.frameCount * 0.03) * 22;

	// Move and aim the layer camera each frame
	camera.setPosition(camX, camY, camZ);
	camera.lookAt(0, 0, 0);
});

scene.draw(() => {
	t.clear();
	t.pointLight([255, 200, 120], { x: 20, y: -15, z: 30 });

	// Rotate center shape group
	t.push();
	t.rotateY(t.frameCount * 1.5);

	// Center cube
	t.push();
	t.char('#');
	t.charColor(120, 220, 255);
	t.box(8, 8, 8);
	t.pop();

	// Left pillar
	t.push();
	t.translate(-12, 0, 0);
	t.char('H');
	t.charColor(255, 120, 120);
	t.box(4, 12, 4);
	t.pop();

	// Right pillar
	t.push();
	t.translate(12, 0, 0);
	t.char('O');
	t.charColor(120, 255, 120);
	t.box(4, 12, 4);
	t.pop();

	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	let y = -Math.floor(t.grid.rows / 2) + 3;
	const x = -Math.floor(t.grid.cols / 2) + 3;

	const eyeStr = `Cam Eye   : [${camX.toFixed(1)}, ${camY.toFixed(1)}, ${camZ.toFixed(1)}]`;
	drawText('TEXTMODELAYER.CREATECAMERA', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: OWNED CAMERA', x, y++, [100, 220, 255]);
	drawText('Creates a camera for this layer.', x, y++, [140, 160, 190]);
	drawText('Then setCamera activates it.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(eyeStr, x, y++, [120, 255, 180]);
	drawText('Target: [0.0, 0.0, 0.0]', x, y++, [200, 200, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
