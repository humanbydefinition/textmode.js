/**
 * @title TextmodeCamera.eyeX
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let eyeValue = 0;

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
	drawCenteredText('TextmodeCamera.eyeX', -8, [240, 245, 255]);
	drawCenteredText('eyeX: ' + eyeValue.toFixed(1), 6, [180, 200, 220]);
});

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const cam = t
		.createCamera()
		.setPosition(Math.sin(t.frameCount * 0.02) * 12, 0, 20)
		.lookAt(0, 0, 0);

	eyeValue = cam.eyeX;
	t.setCamera(cam);

	t.char('+');
	t.charColor(120, 180, 255);
	t.line(-10, 0, 10, 0);
	t.line(0, -5, 0, 5);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
