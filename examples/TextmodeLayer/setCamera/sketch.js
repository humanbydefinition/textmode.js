/**
 * @title TextmodeLayer.setCamera
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let camA;
let camB;
let activeCam = 'A';

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

t.setup(() => {
	camA = scene.createCamera();
	camA.setPosition(-22, -8, 40).lookAt(0, 0, 0);
	camB = scene.createCamera();
	camB.setPosition(22, 12, 36).lookAt(0, 0, 0);
	scene.setCamera(camA);
});

t.draw(() => {
	t.background(8, 10, 18);
	const slot = Math.floor(t.frameCount / 150) % 2;
	if (slot === 0 && activeCam !== 'A') {
		scene.setCamera(camA);
		activeCam = 'A';
	} else if (slot === 1 && activeCam !== 'B') {
		scene.setCamera(camB);
		activeCam = 'B';
	}
});

scene.draw(() => {
	t.clear();
	t.pointLight([255, 210, 130], { x: -20, y: -25, z: 30 });
	const positions = [
		[-12, 0, 0],
		[0, 0, -12],
		[12, 0, 0],
	];
	const colors = [
		[120, 200, 255],
		[200, 160, 255],
		[255, 180, 120],
	];
	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate(positions[i][0], positions[i][1], positions[i][2]);
		t.char('#');
		t.charColor(colors[i][0], colors[i][1], colors[i][2]);
		t.box(7, 7, 7);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const isA = activeCam === 'A';
	drawText('TEXTMODELAYER.SETCAMERA', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: SWAP ACTIVE CAMERA', x, y++, [100, 220, 255]);
	drawText('Two owned cameras alternate.', x, y++, [140, 160, 190]);
	drawText('setCamera selects the view.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`ACTIVE: CAMERA ${activeCam}`, x, y++, isA ? [120, 200, 255] : [255, 180, 120]);
	if (isA) {
		drawText('EYE: [-22, -8, 40]', x, y++, [200, 200, 200]);
	} else {
		drawText('EYE: [22, 12, 36]', x, y++, [200, 200, 200]);
	}
	const remaining = 150 - (t.frameCount % 150);
	drawText(`SWITCH IN: ${remaining} FRAMES`, x, y++, [160, 160, 160]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
