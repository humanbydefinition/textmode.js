/**
 * @title TextmodeCamera.targetY
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
	camera = t.createCamera().setPosition(0, 10, 46);
});

t.draw(() => {
	t.background(8, 10, 24);

	camera.lookAt(0, Math.sin(t.frameCount * 0.03) * 12, 0);
	t.setCamera(camera);
	t.char('O');
	t.charColor(120, 180, 255);
	t.ellipse(16, 8);
	t.push();
	t.translate(0, camera.targetY, 0);
	t.char('*');
	t.charColor(255, 255, 120);
	t.point();
	t.pop();
	label(`targetY ${camera.targetY.toFixed(1)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
