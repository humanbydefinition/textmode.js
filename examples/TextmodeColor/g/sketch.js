/**
 * @title TextmodeColor.g
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let centerGreen = 0;

t.draw(() => {
	t.background(6, 10, 22);

	const time = t.frameCount * 0.02;

	for (let y = -6; y <= 6; y++) {
		const phase = y * 0.3 + time;
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

	centerGreen = Math.round(50 + Math.abs(Math.sin(time)) * 180);
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODECOLOR.G', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GREEN COLOR CHANNEL READ', x, y++, 100, 220, 255);
	drawText('Accesses green channel of active color.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`GREEN VALUE : ${centerGreen}`, x, y++, 80, centerGreen, 120);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
