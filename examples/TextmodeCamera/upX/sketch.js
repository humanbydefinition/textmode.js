/**
 * @title TextmodeCamera.upX
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let upValue = 0;

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

function drawEnvironment() {
	t.push();
	t.char('.');
	t.charColor(60, 80, 120);
	for (let x = -20; x <= 20; x += 4) {
		t.line(x, 0, -20, x, 0, 20);
	}
	for (let z = -20; z <= 20; z += 4) {
		t.line(-20, 0, z, 20, 0, z);
	}
	t.pop();

	t.push();
	t.translate(0, 5, 0);
	t.char('#');
	t.charColor(200, 220, 255);
	t.box(4, 10, 4);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	drawCenteredText('TextmodeCamera.upX', -8, [240, 245, 255]);
	drawCenteredText('upX: ' + upValue.toFixed(2), 6, [120, 255, 180]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.03;
	// Looking from +Z, tilted down slightly
	const cam = t.createCamera().setPosition(0, 10, 40).lookAt(0, 0, 0);

	// Oscillating the X component of the "up" vector creates a roll (tilt) effect
	cam.setUp(Math.sin(time) * 1.5, 1, 0);

	upValue = cam.upX;
	t.setCamera(cam);

	drawEnvironment();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
