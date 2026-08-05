/**
 * @title Textmodifier.lastKeyPressed
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
	t.background(4, 18, 22);

	const keyStr = String(t.lastKeyPressed || 'NONE').toUpperCase();
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	for (let y = -hh; y <= hh; y += 3) {
		for (let x = -hw; x <= hw; x += 3) {
			const wave = (Math.sin(x * 0.1 + tm) + Math.cos(y * 0.1 - tm)) * 0.5;
			if (wave > 0.5) {
				t.push();
				t.translate(x, y);
				t.charColor(10, 36, 42);
				t.char(wave > 0.8 ? '#' : '*');
				t.point();
				t.pop();
			}
		}
	}

	const pedW = 16,
		pedH = 7;
	const px = -Math.floor(pedW / 2),
		py = -Math.floor(pedH / 2);

	for (let cy = 0; cy < pedH; cy++) {
		for (let cx = 0; cx < pedW; cx++) {
			const isBorder = cx === 0 || cx === pedW - 1 || cy === 0 || cy === pedH - 1;
			t.push();
			t.translate(px + cx, py + cy);
			t.cellColor(10, 36, 45);
			if (isBorder) {
				t.charColor(0, 229, 255);
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
	t.charColor(255, 183, 0);
	t.print(keyStr.slice(0, 12), 0, 0);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const keyStr = String(t.lastKeyPressed || 'NONE');

	drawText('TEXTMODIFIER.LASTKEYPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PERSISTENT LAST KEY STATE', x, y++, 100, 220, 255);
	drawText('Reads last pressed key property.', x, y++, 140, 160, 190);
	drawText('Persists until next key is pressed.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('MEMORY VAULT KEY: ' + keyStr, x, y++, 140, 255, 180);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
