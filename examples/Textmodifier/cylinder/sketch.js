/**
 * @title Textmodifier.cylinder
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
	t.background(4, 7, 15);
	t.ambientLight(22, 24, 30);
	t.pointLight([120, 220, 255], { x: 20, y: -12, z: 24 });
	t.camera(Math.sin(time * 0.35) * 14, -6, 88, 0, 2, -8);

	for (let i = 0; i < 6; i++) {
		t.push();
		t.translate((i - 2.5) * 9, 10 - i * 2, -i * 8);
		t.rotateY(time * 22 + i * 12);
		t.char(i % 2 === 0 ? '|' : 'I');
		t.charColor(110 + i * 18, 180 + i * 10, 255 - i * 18);
		t.cellColor(14 + i * 2, 18 + i * 2, 24 + i * 3);
		t.cylinder(2.4 + i * 0.35, 8 + i * 3);
		t.pop();
	}

	label('cylinder(radius, height)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
