/**
 * @title TextmodeLayer.perspective
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let fov = 60;

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

	// FOV oscillates between 20° (telephoto) and 100° (wide)
	fov = 60 + Math.sin(t.frameCount * 0.025) * 40;

	scene.perspective(fov, 0.1, 256);
	scene.camera(0, 0, 44);
	scene.lookAt(0, 0, 0);
});

scene.draw(() => {
	t.clear();
	t.pointLight([255, 210, 130], { x: -20, y: -25, z: 30 });

	// Three columns at increasing depth to show perspective compression
	const depths = [0, -12, -24];
	const colors = [
		[120, 200, 255],
		[160, 220, 180],
		[255, 180, 120],
	];

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate(0, 0, depths[i]);
		t.char('#');
		t.charColor(colors[i][0], colors[i][1], colors[i][2]);
		t.box(8, 8, 8);
		t.pop();
	}

	// Floor grid for depth reference
	t.push();
	t.char('.');
	t.charColor(40, 55, 80);
	for (let x = -24; x <= 24; x += 8) {
		t.line(x, 6, 4, x, 6, -32);
	}
	for (let z = 4; z >= -32; z -= 8) {
		t.line(-24, 6, z, 24, 6, z);
	}
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const fovStr = `FOV: ${fov.toFixed(1)} deg`;
	drawText('TEXTMODELAYER.PERSPECTIVE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: PERSPECTIVE FOV', x, y++, [100, 220, 255]);
	drawText('FOV changes depth compression.', x, y++, [140, 160, 190]);
	drawText('Near/far clip the layer camera.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(fovStr, x, y++, [120, 255, 180]);
	drawText('NEAR: 0.1  FAR: 256.0', x, y++, [200, 200, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
