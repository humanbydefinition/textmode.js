/**
 * @title Textmodifier.perspective
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const scene = [
	{ x: -16, y: 0, z: -18, char: 'A', color: [255, 120, 120] },
	{ x: 0, y: 0, z: 0, char: 'B', color: [120, 255, 160] },
	{ x: 16, y: 0, z: 18, char: 'C', color: [120, 180, 255] },
];

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

function drawScene() {
	for (let i = 0; i < scene.length; i++) {
		const item = scene[i];

		t.push();
		t.translate(item.x, item.y, item.z);
		t.rotateY(t.frameCount * (1.2 + i * 0.2));
		t.rotateX(t.frameCount * (0.8 + i * 0.15));
		t.char(item.char);
		t.charColor(item.color[0], item.color[1], item.color[2]);
		t.rect(8, 8);
		t.pop();
	}
}

t.draw(() => {
	t.background(8, 10, 24);

	const progress = (t.mouse.x + t.grid.cols / 2) / t.grid.cols;
	const fov = 30 + Math.max(0, Math.min(1, progress)) * 70;

	t.perspective(fov, 0.1, 4096);
	t.camera(0, 0, 58, 0, 0, 0);
	drawScene();

	drawLabel(`perspective(${fov.toFixed(1)}, 0.1, 4096)`, Math.floor(t.grid.rows / 2) - 3);
	drawLabel('move mouse horizontally to change fov', Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
