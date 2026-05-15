/**
 * @title TextmodeCamera.setUp
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let upX = 0;
let upY = 1;
let upZ = 0;

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	drawCenteredText('TextmodeCamera.setUp', -8, [240, 245, 255]);
	drawCenteredText('up: ' + upX.toFixed(2) + ', ' + upY.toFixed(2) + ', ' + upZ.toFixed(2), 6, [180, 200, 220]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	const cam = t.createCamera().setPosition(0, 0, 30).lookAt(0, 0, 0);

	cam.setUp(Math.sin(time) * 0.8, 1, Math.cos(time) * 0.6);

	upX = cam.upX;
	upY = cam.upY;
	upZ = cam.upZ;

	t.setCamera(cam);

	t.push();
	t.char('+');
	t.charColor(120, 180, 255);
	t.line(-10, 0, 10, 0);
	t.line(0, -5, 0, 5);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
