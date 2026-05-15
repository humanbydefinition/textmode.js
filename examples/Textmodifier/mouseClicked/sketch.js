/**
 * @title Textmodifier.mouseClicked
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const echoes = [];

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

t.mouseClicked((data) => {
	if (data.position.x === Number.NEGATIVE_INFINITY) return;

	echoes.push({
		x: data.position.x,
		y: data.position.y,
		time: t.secs,
		life: 1.0,
	});

	if (echoes.length > 10) echoes.shift();
});

t.draw(() => {
	t.background(6, 10, 22);

	for (let i = 0; i < echoes.length; i++) {
		const e = echoes[i];
		e.life *= 0.95;

		if (e.life < 0.01) {
			echoes.splice(i, 1);
			i--;
			continue;
		}

		t.push();
		t.translate(e.x, e.y);

		const radius = (1.0 - e.life) * 20;
		t.charColor(100, 200, 255, e.life * 255);
		t.char('○');
		t.ellipse(radius, radius);

		t.charColor(50, 100, 255, e.life * 100);
		t.char('·');
		t.ellipse(radius * 0.6, radius * 0.6);

		t.pop();
	}

	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		t.push();
		t.translate(t.mouse.x, t.mouse.y);
		t.char('+');
		t.charColor(255);
		t.point();
		t.pop();
	}

	drawCenteredText('Textmodifier.mouseClicked', -20, [255, 255, 255]);
	drawCenteredText('An event callback that triggers on a full mouse click.', -18, [150, 170, 200]);
	drawCenteredText('Click anywhere to create a ripple effect.', -16, [150, 170, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
