/**
 * @title TextmodeCamera.upX
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
	camera = t.createCamera().setPosition(0, 0, 54).lookAt(0, 0, 0);
});

t.draw(() => {
	t.background(8, 10, 24);

	camera.setUp(Math.sin(t.frameCount * 0.03) * 0.9, 1, 0);
	t.setCamera(camera);
	t.char('-');
	t.charColor(120, 180, 255);
	for (let i = -2; i <= 2; i++) t.line(-22, i * 4, 22, i * 4);
	label(`upX ${camera.upX.toFixed(2)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
