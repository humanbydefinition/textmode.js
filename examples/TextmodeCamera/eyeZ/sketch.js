/**
 * @title TextmodeCamera.eyeZ
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let camera;

function label(text, y) {
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

	camera.setPosition(0, 0, 36 + Math.sin(t.frameCount * 0.03) * 18).lookAt(0, 0, 0);
	t.setCamera(camera);
	t.char('0');
	t.charColor(255, 180, 120);
	t.ellipse(10, 10);
	t.char('+');
	t.charColor(120, 180, 255);
	t.arc(18, 18, 30, 330);
	label(`eyeZ ${camera.eyeZ.toFixed(1)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
