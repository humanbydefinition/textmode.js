/**
 * @title TextmodeCamera.lookAt
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
	camera = t.createCamera().setPosition(0, 14, 42);
});

t.draw(() => {
	t.background(8, 10, 24);

	const time = t.frameCount * 0.03;
	camera.lookAt(Math.cos(time) * 12, Math.sin(time * 0.7) * 8, Math.sin(time) * 14);
	t.setCamera(camera);

	for (let i = 0; i < 4; i++) {
		t.push();
		t.translate((i - 1.5) * 10, -6 + i * 4, -i * 10);
		t.rotateZ(t.frameCount * (0.8 + i * 0.1));
		t.char(['A', 'B', 'C', 'D'][i]);
		t.charColor(120 + i * 30, 150 + i * 20, 255 - i * 30);
		t.triangle(0, -4, -4, 4, 4, 4);
		t.pop();
	}

	t.push();
	t.translate(camera.targetX, camera.targetY, camera.targetZ);
	t.char('*');
	t.charColor(255, 255, 120);
	t.point();
	t.pop();

	label('lookAt() tracks the moving marker', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
