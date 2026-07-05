/**
 * @title TextmodeColor.a
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let currentAlpha = 255;

t.draw(() => {
	t.background(0);

	const time = t.frameCount * 0.05;
	const trailLen = 15;

	for (let i = 0; i < trailLen; i++) {
		const alpha = 255 * (1 - i / trailLen);
		const col = t.color(255, 255, 255, alpha);

		const tOffset = time - i * 0.1;
		const x = Math.cos(tOffset) * 15;
		const y = Math.sin(tOffset) * 15;

		t.push();
		t.translate(x, y);
		t.char(col.a > 128 ? '@' : '.');
		t.charColor(col);
		t.point();
		t.pop();
	}

	const activeColor = t.color(255, 255, 255, 128 + Math.round(127 * Math.sin(time)));
	currentAlpha = activeColor.a;
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

	drawText('TEXTMODECOLOR.A', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ALPHA COLOR CHANNEL READ', x, y++, 100, 220, 255);
	drawText('Accesses alpha opacity of active color.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ALPHA VALUE : ${currentAlpha}`, x, y++, 240, 240, 240);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
