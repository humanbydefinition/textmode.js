/**
 * @title Textmodifier.QUADS
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.QUADS;
const modeName = 'QUADS';
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.04;
	t.background(6, 10, 20);
	t.beginShape(mode);
	for (let gy = -2; gy <= 2; gy++) {
		for (let gx = -4; gx <= 4; gx++) {
			const cx = gx * 4 + Math.sin(time + gy) * 1.5;
			const cy = gy * 4 + Math.cos(time + gx) * 1.5;
			const s = 1.4 + Math.sin(time * 2 + gx + gy) * 0.5;
			t.char((gx + gy) % 2 ? '#' : '+');
			t.charColor(120 + gx * 14, 190 + gy * 12, 250);
			t.cellColor(12 + gx * 3, 22 + gy * 6, 45);
			t.vertex(cx - s, cy - s);
			t.vertex(cx + s, cy - s);
			t.vertex(cx + s, cy + s);
			t.vertex(cx - s, cy + s);
		}
	}
	t.endShape();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.QUADS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: FOUR VERTEX PATCHES', x, y++, 100, 220, 255);
	drawText('Every four vertices fill.', x, y++, 140, 160, 190);
	drawText('Each cell is independent.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
