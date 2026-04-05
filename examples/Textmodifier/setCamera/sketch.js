/**
 * @title Textmodifier.setCamera
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let cameraA;
let cameraB;
let useA = true;

const scene = [
	{ x: -16, y: 0, z: 0, char: 'L', color: [255, 120, 120] },
	{ x: 0, y: 0, z: -12, char: 'M', color: [120, 255, 160] },
	{ x: 16, y: 0, z: 0, char: 'R', color: [120, 180, 255] },
];

function drawScene() {
	for (let i = 0; i < scene.length; i++) {
		const item = scene[i];

		t.push();
		t.translate(item.x, item.y, item.z);
		t.rotateY(t.frameCount * (0.9 + i * 0.2));
		t.rotateZ(t.frameCount * (0.7 + i * 0.15));
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
	cameraA = t.createCamera();
	cameraA.setPosition(-32, 10, 24).lookAt(0, 0, 0);

	cameraB = cameraA.copy().setPosition(32, 10, 24).lookAt(0, 0, 0);
	t.setCamera(cameraA);
});

t.mouseClicked(() => {
	useA = !useA;
	t.setCamera(useA ? cameraA : cameraB);
});

t.draw(() => {
	t.background(8, 10, 24);
	drawScene();
	drawLabel('click to switch setCamera(cameraA / cameraB)', Math.floor(t.grid.rows / 2) - 3);
	drawLabel(useA ? 'cameraA active' : 'cameraB active', Math.floor(t.grid.rows / 2) - 1);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
