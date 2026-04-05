/**
 * @title TextmodeCamera.eyeY
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

	camera.setPosition(0, 8 + Math.sin(t.frameCount * 0.04) * 12, 52).lookAt(0, 0, 0);
	t.setCamera(camera);

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 12, -8 + i * 6, -i * 10);
		t.char(['A', 'P', 'E'][i]);
		t.charColor(120 + i * 30, 160 + i * 20, 255);
		t.triangle(0, -4, -4, 4, 4, 4);
		t.pop();
	}

	label(`eyeY ${camera.eyeY.toFixed(1)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
