/**
 * @title Textmodifier.sphere
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

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

t.draw(() => {
	const time = t.frameCount * 0.02;
	t.background(4, 6, 16);
	t.ambientLight(18, 20, 26);
	t.pointLight([120, 210, 255], { x: 18, y: -10, z: 26 });
	t.pointLight([255, 150, 100], { x: -20, y: 8, z: -18 });
	t.camera(Math.cos(time * 0.45) * 16, -5, 76, 0, 0, 0);

	t.push();
	t.rotateY(time * 38);
	t.rotateX(16);
	t.char('@');
	t.charColor(230, 240, 255);
	t.cellColor(18, 24, 34);
	t.sphere(10 + Math.sin(time * 1.3) * 1.5);
	t.pop();

	for (let i = 0; i < 3; i++) {
		t.push();
		t.rotateY(i * 120 + time * (46 + i * 12));
		t.translate(20, Math.sin(time * 2 + i) * 4, 0);
		t.char(['o', '*', '+'][i]);
		t.charColor(255, 180 - i * 30, 120 + i * 50);
		t.cellColor(18, 12, 22 + i * 6);
		t.sphere(2.2 + i * 0.7);
		t.pop();
	}

	label('sphere(radius)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
