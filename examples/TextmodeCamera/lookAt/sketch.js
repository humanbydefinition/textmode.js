/**
 * @title TextmodeCamera.lookAt
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let targetX = 0;
let targetY = 0;
let targetZ = 0;

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
	drawCenteredText('TextmodeCamera.lookAt', -8, [240, 245, 255]);
	drawCenteredText(
		'target: ' + targetX.toFixed(1) + ', ' + targetY.toFixed(1) + ', ' + targetZ.toFixed(1),
		6,
		[180, 200, 220]
	);
});

t.setup(() => {
	t.perspective(58, 0.1, 4096);
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;
	targetX = Math.cos(time) * 8;
	targetY = Math.sin(time * 0.7) * 5;
	targetZ = Math.sin(time) * 8;

	const cam = t.createCamera().setPosition(0, 10, 30).lookAt(targetX, targetY, targetZ);
	t.setCamera(cam);

	t.char('+');
	t.charColor(120, 180, 255);
	t.line(-10, 0, 10, 0);
	t.line(0, -5, 0, 5);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
