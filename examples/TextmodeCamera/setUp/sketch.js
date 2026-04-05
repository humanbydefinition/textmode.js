/**
 * @title TextmodeCamera.setUp
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

	const time = t.frameCount * 0.025;
	camera.setUp(Math.sin(time) * 0.8, 1, Math.cos(time) * 0.6);
	t.setCamera(camera);

	for (let i = 0; i < 6; i++) {
		t.char(i % 2 === 0 ? '-' : '=');
		t.charColor(110 + i * 18, 180, 255);
		t.line(-24, -10 + i * 4, 24, -10 + i * 4);
	}

	t.char('#');
	t.charColor(255, 170, 120);
	t.rect(6, 6);
	label('setUp() banks and rolls the horizon', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
