/**
 * @title TextmodeCamera.copy
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let originalCamera;
let clonedCamera;

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
	originalCamera = t.createCamera().setPosition(-28, 12, 28).lookAt(0, 0, 0);
	clonedCamera = originalCamera.copy().setPosition(28, 12, 28);
});

t.draw(() => {
	t.background(8, 10, 24);

	const time = t.frameCount * 0.025;
	clonedCamera.lookAt(Math.sin(time) * 10, 0, 0);
	t.setCamera(Math.floor(t.frameCount / 120) % 2 === 0 ? originalCamera : clonedCamera);

	for (let i = 0; i < 5; i++) {
		t.push();
		t.translate((i - 2) * 10, Math.sin(time * 2 + i) * 3, -i * 8);
		t.rotateY(t.frameCount * (0.8 + i * 0.1));
		t.char(['O', 'R', 'I', 'G', '!'][i]);
		t.charColor(140 + i * 20, 120 + i * 16, 255 - i * 20);
		t.ellipse(5 + i, 3 + i * 0.6);
		t.pop();
	}

	label('copy() makes an independent clone', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
