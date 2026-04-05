/**
 * @title TextmodeCamera.targetX
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

	camera.lookAt(Math.sin(t.frameCount * 0.03) * 16, 0, 0);
	t.setCamera(camera);

	for (let i = 0; i < 5; i++) {
		t.push();
		t.translate((i - 2) * 8, 0, -i * 8);
		t.char(['L', 'E', 'F', 'T', 'R'][i]);
		t.charColor(130 + i * 20, 160, 255 - i * 24);
		t.rect(5, 5);
		t.pop();
	}

	t.push();
	t.translate(camera.targetX, 0, 0);
	t.char('*');
	t.charColor(255, 255, 120);
	t.point();
	t.pop();

	label(`targetX ${camera.targetX.toFixed(1)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
