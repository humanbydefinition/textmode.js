/**
 * @title TextmodeColor.g
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	for (let y = -6; y <= 6; y++) {
		const phase = y * 0.3 + time;
		const wave = Math.sin(phase);
		const shapedWave = 0.7 * Math.sin(phase) + 0.3 * Math.sin(phase * 3);
		const green = Math.round(50 + shapedWave * 180);
		const c = t.color(80, green, 120);

		const offset = shapedWave * 3;

		t.push();
		t.translate(offset, y);
		t.charColor(c.r, c.g, c.b);
		t.char('~');
		t.rect(Math.abs(shapedWave) * 12 + 2, 1);
		t.pop();
	}

	const centerGreen = Math.round(50 + Math.abs(Math.sin(time)) * 180);
	const label = `green: ${t.color(80, centerGreen, 120).g}`;
	t.push();
	t.translate(-Math.floor(label.length / 2), 10);
	t.charColor(80, centerGreen, 120);

	for (let i = 0; i < label.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(label[i]);
		t.point();
		t.pop();
	}

	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
