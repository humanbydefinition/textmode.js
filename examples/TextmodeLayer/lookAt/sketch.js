/**
 * @title TextmodeLayer.lookAt
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const scene = t.layers.add();
const labelLayer = t.layers.add();

let targetX = 0;
let targetY = 0;

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

	targetX = Math.sin(t.frameCount * 0.04) * 12;
	targetY = Math.cos(t.frameCount * 0.03) * 7;

	// Camera stays fixed — only the look target moves
	scene.camera(0, 0, 46);
	scene.lookAt(targetX, targetY, 0);
});

scene.draw(() => {
	t.clear();

	// Static reference pillars spread around the scene
	t.push();
	t.translate(-16, 4, -10);
	t.char('H');
	t.charColor(100, 130, 200);
	t.box(5, 14, 5);
	t.pop();

	t.push();
	t.translate(16, 4, -10);
	t.char('H');
	t.charColor(100, 130, 200);
	t.box(5, 14, 5);
	t.pop();

	t.push();
	t.translate(0, 8, -18);
	t.char('+');
	t.charColor(80, 100, 160);
	t.box(30, 2, 2);
	t.pop();

	// Moving glowing target — the camera tracks this
	t.push();
	t.translate(targetX, targetY, 0);
	t.char('*');
	t.charColor(255, 230, 80);
	t.box(4, 4, 4);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const tgtStr = `Cam Target: [${targetX.toFixed(1)}, ${targetY.toFixed(1)}, 0.0]`;

	drawText('TEXTMODELAYER.LOOKAT', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: CAMERA TARGET', x, y++, [100, 220, 255]);
	drawText('Camera eye stays fixed.', x, y++, [140, 160, 190]);
	drawText('lookAt follows a moving target.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('Eye: [0.0, 0.0, 46.0]', x, y++, [200, 200, 200]);
	drawText(tgtStr, x, y++, [120, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
