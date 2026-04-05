/**
 * @title Textmodifier.ortho
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

function drawLabel(text, y) {
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
	t.background(0);
	t.ortho();

	const count = 12;

	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2 + t.frameCount * 0.02;
		const x = Math.cos(angle) * 20;
		const y = Math.sin(angle) * 20;
		const z = Math.sin(t.frameCount * 0.05 + i) * 50;

		t.push();
		t.translate(x, y, z);
		t.charColor(200, 255, 100);
		t.char('#');
		t.rect(5, 5);
		t.pop();
	}

	drawLabel('ortho(): z depth no longer changes size', Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
