/**
 * @title Textmodifier.cursor
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
let currentCursor = 'default';

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.draw(() => {
	t.background(10, 12, 18);
	const mx = t.mouse.x,
		my = t.mouse.y;
	const isInside = mx !== Number.NEGATIVE_INFINITY;

	if (isInside) {
		if (mx < 0 && my < 0) currentCursor = 'crosshair';
		else if (mx >= 0 && my < 0) currentCursor = 'grab';
		else if (mx < 0 && my >= 0) currentCursor = 'not-allowed';
		else currentCursor = 'pointer';
	} else {
		currentCursor = 'default';
	}
	t.cursor(currentCursor);

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	for (let y = -hh + 1; y <= hh - 1; y += 1) {
		for (let x = -hw + 1; x <= hw - 1; x += 1) {
			const isTL = x < 0 && y < 0,
				isTR = x >= 0 && y < 0;
			const isBL = x < 0 && y >= 0,
				isBR = x >= 0 && y >= 0;
			const isActive =
				isInside &&
				((isTL && currentCursor === 'crosshair') ||
					(isTR && currentCursor === 'grab') ||
					(isBL && currentCursor === 'not-allowed') ||
					(isBR && currentCursor === 'pointer'));

			if (x === 0 || y === 0) {
				t.push();
				t.translate(x, y);
				t.charColor(40, 50, 75);
				t.char(x === 0 && y === 0 ? '+' : x === 0 ? '|' : '-');
				t.point();
				t.pop();
			} else if (isActive) {
				t.push();
				t.translate(x, y);
				if (isTL) {
					t.charColor(0, 229, 255);
					t.cellColor(0, 40, 60);
					t.char('+');
				} else if (isTR) {
					t.charColor(0, 255, 136);
					t.cellColor(0, 50, 30);
					t.char('#');
				} else if (isBL) {
					t.charColor(255, 51, 85);
					t.cellColor(60, 0, 20);
					t.char('X');
				} else {
					t.charColor(255, 204, 0);
					t.cellColor(60, 45, 0);
					t.char('>');
				}
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.CURSOR', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DYNAMIC CURSOR SYNTHESIZER', x, y++, 100, 220, 255);
	drawText('Updates cursor by hit-testing grid.', x, y++, 140, 160, 190);
	drawText('Supports crosshair, grab & pointer.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('ACTIVE CURSOR: ' + currentCursor.toUpperCase(), x, y++, 140, 255, 180);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
