/**
 * @title TextmodeLayer.resetCamera
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let useCustomCamera = true;

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

	// Alternate every 150 frames so the contrast is clear
	useCustomCamera = Math.floor(t.frameCount / 150) % 2 === 0;

	if (useCustomCamera) {
		// Dramatic off-axis perspective with moving eye
		const camX = Math.sin(t.frameCount * 0.02) * 18;
		scene.camera(camX, -14, 42, 0, 0, 0);
	} else {
		// Discard custom camera — auto view is restored
		scene.resetCamera();
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

	drawText('TEXTMODELAYER.RESETCAMERA', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: RESET LAYER CAMERA', x, y++, [100, 220, 255]);

	if (useCustomCamera) {
		drawText('MODE: CUSTOM CAMERA', x, y++, [255, 200, 100]);
		drawText('camera() override is active.', x, y++, [140, 160, 190]);
	} else {
		drawText('MODE: AUTO CAMERA', x, y++, [120, 255, 180]);
		drawText('resetCamera restored default.', x, y++, [140, 160, 190]);
	}

	drawText('------------------------------------', x, y++, [80, 100, 150]);
	const remaining = 150 - (t.frameCount % 150);
	drawText(`SWITCH IN: ${remaining} FRAMES`, x, y++, [200, 200, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
