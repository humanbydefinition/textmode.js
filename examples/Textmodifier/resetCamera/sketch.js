/**
 * @title Textmodifier.resetCamera
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let customCamera;
let autoMode = false;

const scene = [
	{ x: -12, y: 0, z: -10, char: 'A', color: [255, 120, 120] },
	{ x: 0, y: 0, z: 0, char: 'B', color: [120, 255, 160] },
	{ x: 12, y: 0, z: 10, char: 'C', color: [120, 180, 255] },
];

function drawScene() {
	for (let i = 0; i < scene.length; i++) {
		const item = scene[i];

		t.push();
		t.translate(item.x, item.y, item.z);
		t.rotateX(t.frameCount * (0.8 + i * 0.1));
		t.rotateY(t.frameCount * (1.1 + i * 0.15));
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
	customCamera = t.createCamera();
	customCamera.setPosition(0, 14, 34).lookAt(0, 0, 0);
	t.setCamera(customCamera);
});

t.mouseClicked(() => {
	autoMode = !autoMode;

	if (autoMode) {
		t.resetCamera();
		return;
	}

	t.setCamera(customCamera);
});

t.draw(() => {
	t.background(8, 10, 24);
	drawScene();
	drawLabel('click to toggle resetCamera()', Math.floor(t.grid.rows / 2) - 3);
	drawLabel(autoMode ? 'auto camera active' : 'custom camera active', Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
