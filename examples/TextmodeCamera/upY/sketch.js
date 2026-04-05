/**
 * @title TextmodeCamera.upY
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

	camera.setUp(0, 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t.frameCount * 0.03)), 0.4);
	t.setCamera(camera);
	t.char('A');
	t.charColor(255, 170, 120);
	t.triangle(0, -12, -10, 10, 10, 10);
	label(`upY ${camera.upY.toFixed(2)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
