/**
 * @title Textmodifier.gamepadAxisChanged
 * @description Convert meaningful axis deltas into drifting vectors so analog motion is easy to see.
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const vectors = [];

function drawText(text, x, y, r = 220, g = r, b = r, a = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b, a);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

function arrowForDelta(delta) {
	if (delta > 0.08) return '>';
	if (delta < -0.08) return '<';
	return '|';
}

t.gamepadAxisChanged((data) => {
	const label = data.standardAxisName || `axis[${data.axisIndex}]`;
	vectors.unshift({
		label,
		value: data.value,
		delta: data.delta,
		x: -18 + (data.axisIndex % 4) * 12,
		y: -4 + (vectors.length % 6) * 3,
		life: 1,
	});

	if (vectors.length > 24) vectors.length = 24;
});

t.draw(() => {
	t.background(0);

	drawText('gamepadAxisChanged()', -28, -18, 255, 255, 255);
	drawText('move a stick or analog trigger to emit change notifications', -28, -16, 140, 140, 140);

	if (vectors.length === 0) {
		drawText('waiting for analog movement...', -28, -4, 100, 100, 100);
	}

	for (let i = vectors.length - 1; i >= 0; i--) {
		const vector = vectors[i];
		vector.life -= 0.018;
		vector.x += vector.delta * 4;

		if (vector.life <= 0) {
			vectors.splice(i, 1);
			continue;
		}

		const a = Math.round(255 * vector.life);
		const arrow = arrowForDelta(vector.delta);
		drawText(arrow, Math.round(vector.x - 2), vector.y, 120, 200, 255, a);
		drawText(
			`${vector.label} ${(vector.value >= 0 ? '+' : '') + vector.value.toFixed(2)}`,
			Math.round(vector.x),
			vector.y,
			180,
			220,
			255,
			a
		);
	}
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
