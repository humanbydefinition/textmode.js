/**
 * @title Textmodifier.createCamera
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let camera;

const scene = [
	{ x: -14, y: -4, z: 0, char: 'A', color: [255, 120, 120] },
	{ x: 0, y: 6, z: -10, char: 'B', color: [120, 255, 160] },
	{ x: 14, y: -2, z: 8, char: 'C', color: [120, 180, 255] },
];

function drawScene() {
	for (let i = 0; i < scene.length; i++) {
		const item = scene[i];

		t.push();
		t.translate(item.x, item.y, item.z);
		t.rotateX(t.frameCount * (1 + i * 0.15));
		t.rotateY(t.frameCount * (1.4 + i * 0.2));
		t.char(item.char);
		t.charColor(item.color[0], item.color[1], item.color[2]);
		t.rect(8, 8);
		t.pop();
	}
}

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y, 0);
	t.charColor(220);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.setup(() => {
	t.perspective(58, 0.1, 4096);
	camera = t.createCamera();
});

t.draw(() => {
	t.background(8, 10, 24);

	const time = t.frameCount * 0.02;
	camera
		.setPosition(Math.cos(time) * 34, Math.sin(time * 0.6) * 10, Math.sin(time) * 34)
		.lookAt(0, 0, 0)
		.setUp(0, 1, 0);
	t.setCamera(camera);

	drawScene();
	drawLabel('createCamera() for a reusable camera object', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
