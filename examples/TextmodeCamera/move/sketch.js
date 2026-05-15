/**
 * @title TextmodeCamera.move
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeX = 0;
let eyeY = 0;
let eyeZ = 0;

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
	drawCenteredText('TextmodeCamera.move', -8, [240, 245, 255]);
	drawCenteredText('eye: ' + eyeX.toFixed(1) + ', ' + eyeY.toFixed(1) + ', ' + eyeZ.toFixed(1), 6, [180, 200, 220]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	const cam = t.createCamera().setPosition(0, 6, 30).lookAt(0, 6, 0);

	cam.move(Math.sin(time) * 12 - eyeX, 0, 0);

	eyeX = cam.eyeX;
	eyeY = cam.eyeY;
	eyeZ = cam.eyeZ;

	t.setCamera(cam);

	t.push();
	t.translate(0, 6, 0);
	t.char('+');
	t.charColor(120, 180, 255);
	t.line(-10, 0, 10, 0);
	t.line(0, -5, 0, 5);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
