/**
 * @title Textmodifier.mouseDragged
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const trail = [];

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.mouseDragged((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	trail.push({
		x: data.position.x,
		y: data.position.y,
		life: 1.0,
		char: ['#', '*', '•', '·'][Math.floor(Math.random() * 4)],
	});

	if (trail.length > 200) trail.shift();
});

t.draw(() => {
	t.background(6, 10, 22);

	for (let i = 0; i < trail.length; i++) {
		const p = trail[i];
		p.life *= 0.96;

		if (p.life < 0.05) {
			trail.splice(i, 1);
			i--;
			continue;
		}

		t.push();
		t.translate(p.x, p.y);
		t.char(p.char);
		t.charColor(100, 200, 255, p.life * 255);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.mouseDragged', -20, [255, 255, 255]);
	drawCenteredText('Fires while moving with a button held.', -18, [150, 170, 200]);
	drawCenteredText('Great for drawing or dragging objects.', -16, [150, 170, 200]);

	drawCenteredText('Click and DRAG to paint', 18, [100, 255, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
