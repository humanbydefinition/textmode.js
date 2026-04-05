/**
 * @title TextmodeCamera.targetZ
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
	camera = t.createCamera().setPosition(0, 8, 44);
});

t.draw(() => {
	t.background(8, 10, 24);

	camera.lookAt(0, 0, -20 + Math.sin(t.frameCount * 0.03) * 18);
	t.setCamera(camera);

	for (let i = 0; i < 4; i++) {
		t.push();
		t.translate(0, 0, -i * 14);
		t.char(['N', 'E', 'A', 'R'][i]);
		t.charColor(150 + i * 20, 150, 255 - i * 30);
		t.rect(8 - i, 8 - i);
		t.pop();
	}

	t.push();
	t.translate(0, 0, camera.targetZ);
	t.char('*');
	t.charColor(255, 255, 120);
	t.point();
	t.pop();

	label(`targetZ ${camera.targetZ.toFixed(1)}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
