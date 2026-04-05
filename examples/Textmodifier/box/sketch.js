/**
 * @title Textmodifier.box
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
	t.background(6, 8, 18);
	t.ambientLight(22, 24, 30);
	t.pointLight([255, 170, 120], { x: Math.cos(time) * 26, y: -8, z: 28 });
	t.camera(Math.sin(time * 0.5) * 18, -8, 84, 0, 0, 0);

	for (let i = 0; i < 4; i++) {
		t.push();
		t.translate((i - 1.5) * 12, Math.sin(time * 2 + i) * 2, -i * 8);
		t.rotateX(18 + Math.sin(time * 1.7 + i) * 10);
		t.rotateY(time * 42 + i * 18);
		t.char(['#', 'H', 'X', '@'][i]);
		t.charColor(140 + i * 22, 110 + i * 18, 255 - i * 24);
		t.cellColor(14 + i * 3, 12 + i * 2, 22 + i * 4);
		t.box(5 + i * 2, 4 + (i % 2) * 4, 3 + i * 1.5);
		t.pop();
	}

	label('box(width, height, depth)', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
