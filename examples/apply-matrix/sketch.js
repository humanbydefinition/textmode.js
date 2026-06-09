import { textmode } from 'textmode.js';

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	frameRate: 60,
});

function trsMatrixY(angle, tx, ty, tz, sx, sy, sz) {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return new Float32Array([c * sx, 0, -s * sx, 0, 0, sy, 0, 0, s * sz, 0, c * sz, 0, tx, ty, tz, 1]);
}

function drawItem(glyph, color, drawShape) {
	t.char(glyph);
	t.charColor(color[0], color[1], color[2]);
	t.cellColor(0, 0, 0);
	drawShape();
}

t.setup(() => {
	t.perspective(60, 0.1, 4096);
	const camera = t.createCamera();
	camera.setPosition(0, 7, 62).lookAt(0, 0, 0);
	t.setCamera(camera);
});

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(6, 9, 22);

	const left = trsMatrixY(time * 1.8, -16, 1.5, -4, 1.35, 1.1, 1.35);
	t.push();
	t.applyMatrix(left);
	drawItem('M', [255, 130, 130], () => t.box(9, 9, 9));
	t.pop();

	const center = trsMatrixY(time * 2.2, 0, 2.5, 0, 1.0, 1.4, 1.0);
	t.push();
	t.applyMatrix(
		center[0],
		center[1],
		center[2],
		center[3],
		center[4],
		center[5],
		center[6],
		center[7],
		center[8],
		center[9],
		center[10],
		center[11],
		center[12],
		center[13],
		center[14],
		center[15]
	);
	drawItem('N', [120, 255, 170], () => t.cone(5, 12));
	t.pop();

	const right = trsMatrixY(time * 1.5, 16, 1.5, 6, 1.2, 1.2, 1.2);
	t.push();
	t.applyMatrix(right);
	t.rotate(t.frameCount * 1.2, [0.3, 1, 0.2]);
	t.scale(1.0 + Math.sin(time * 1.7) * 0.25);
	drawItem('X', [120, 185, 255], () => t.torus(3.5, 1.5));
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
