/**
 * @title Textmodifier.lastKeyReleased
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.draw(() => {
	t.background(8, 10, 24);

	const keyStr = String(t.lastKeyReleased || 'NONE').toUpperCase();
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const d = Math.hypot(x, y * 1.3),
				echo = (d * 0.25 - tm) % 1.0;
			const val = echo < 0 ? echo + 1.0 : echo;
			if (val < 0.25) {
				const int = 1 - val / 0.25;
				t.push();
				t.translate(x, y);
				t.charColor(Math.floor(157 + int * 60), Math.floor(78 + int * 90), 223);
				t.char(d < 5 ? 'o' : d < 12 ? '*' : '.');
				t.point();
				t.pop();
			}
		}
	}

	const pedW = 16,
		pedH = 5,
		px = -8,
		py = -2;
	for (let cy = 0; cy < pedH; cy++) {
		for (let cx = 0; cx < pedW; cx++) {
			const isBorder = cx === 0 || cx === pedW - 1 || cy === 0 || cy === pedH - 1;
			t.push();
			t.translate(px + cx, py + cy);
			t.cellColor(24, 15, 45);
			if (isBorder) {
				t.charColor(224, 170, 255);
				const isCorner = (cy === 0 || cy === pedH - 1) && (cx === 0 || cx === pedW - 1);
				t.char(isCorner ? '+' : cy === 0 || cy === pedH - 1 ? '=' : '|');
			} else {
				t.char(' ');
			}
			t.point();
			t.pop();
		}
	}

	t.push();
	t.printAlign('center', 'middle');
	t.charColor(255, 204, 255);
	t.print(keyStr.slice(0, 12), 0, 0);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const keyStr = String(t.lastKeyReleased || 'NONE');

	drawText('TEXTMODIFIER.LASTKEYRELEASED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PERSISTENT LAST UP-STROKE', x, y++, 100, 220, 255);
	drawText('Reads last released key property.', x, y++, 140, 160, 190);
	drawText('Persists until next key is released.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('LAST RELEASED KEY: ' + keyStr, x, y++, 140, 255, 180);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
