/**
 * @title Textmodifier.frameRate
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let target = 60;

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(200);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

t.mouseClicked(() => {
	target = target === 60 ? 10 : 60;
	t.frameRate(target);
});

t.draw(() => {
	t.background(0);

	for (let i = 0; i < 18; i++) {
		const angle = t.frameCount * 0.05 + i * 0.35;
		const radius = 4 + i * 0.8;

		t.push();
		t.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);
		t.char(i % 2 === 0 ? '*' : '+');
		t.charColor(80 + i * 8, 255 - i * 6, 120);
		t.point();
		t.pop();
	}

	drawLabel('click to toggle frameRate(10/60)', Math.floor(t.grid.rows / 2) - 4);
	drawLabel(`measured fps: ${t.frameRate().toFixed(1)}`, Math.floor(t.grid.rows / 2) - 2);
	drawLabel(`target: ${target}`, Math.floor(t.grid.rows / 2));
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
