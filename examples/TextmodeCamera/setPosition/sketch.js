/**
 * @title TextmodeCamera.setPosition
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

	const time = t.frameCount * 0.02;
	camera.setPosition(Math.cos(time) * 34, 10 + Math.sin(time * 0.7) * 8, Math.sin(time) * 34).lookAt(0, 0, 0);
	t.setCamera(camera);

	for (let i = 0; i < 3; i++) {
		t.push();
		t.translate((i - 1) * 18, 0, -i * 8);
		t.rotateY(t.frameCount * (1 + i * 0.25));
		t.char(['L', 'M', 'R'][i]);
		t.charColor(255 - i * 60, 120 + i * 30, 120 + i * 50);
		t.rect(8, 12);
		t.pop();
	}

	label('setPosition() orbits three towers', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
