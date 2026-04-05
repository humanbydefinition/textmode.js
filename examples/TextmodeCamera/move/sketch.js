/**
 * @title TextmodeCamera.move
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let camera;
let previousX = 0;

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
	camera = t.createCamera().setPosition(0, 6, 48).lookAt(0, 6, -40);
});

t.draw(() => {
	t.background(8, 10, 24);

	const nextX = Math.sin(t.frameCount * 0.02) * 18;
	camera.move(nextX - previousX, 0, 0);
	previousX = nextX;
	t.setCamera(camera);

	for (let i = 0; i < 7; i++) {
		const z = -i * 14;
		t.push();
		t.translate(0, 0, z);
		t.char('|');
		t.charColor(120, 180, 255);
		t.line(-12, 0, -12, 10);
		t.line(12, 0, 12, 10);
		t.translate(0, 5, 0);
		t.char('+');
		t.line(-12, 0, 12, 0);
		t.pop();
	}

	label('move() strafes eye and target together', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
