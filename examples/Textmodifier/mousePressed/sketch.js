/**
 * @title Textmodifier.mousePressed
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
const shocks = [];
let pressCount = 0,
	lastDown = 'NONE';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.mousePressed(() => {
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		pressCount++;
		lastDown = `(${t.mouse.x}, ${t.mouse.y})`;
		shocks.unshift({ x: t.mouse.x, y: t.mouse.y, age: 0, maxAge: 40 });
		if (shocks.length > 10) shocks.length = 10;
	}
});

t.draw(() => {
	t.background(18, 18, 20);
	for (let i = shocks.length - 1; i >= 0; i--) {
		if (++shocks[i].age >= shocks[i].maxAge) shocks.splice(i, 1);
	}
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const isDiag1 = (x + y) % 7 === 0,
				isDiag2 = (x - y) % 7 === 0;
			const symbol = isDiag1 && isDiag2 ? '+' : isDiag1 ? '/' : isDiag2 ? '\\' : ' ';

			let shockIntensity = 0;
			for (let i = 0; i < shocks.length; i++) {
				const s = shocks[i],
					dist = Math.abs(Math.hypot(x - s.x, y - s.y) - s.age * 1.2);
				if (dist < 2.5) shockIntensity += (1 - dist / 2.5) * (1 - s.age / s.maxAge);
			}

			if (symbol !== ' ' || shockIntensity > 0.1) {
				t.push();
				t.translate(x, y);
				if (shockIntensity > 0.4) {
					t.charColor(255, 255, 255);
					t.cellColor(255, 0, 85);
					t.char(symbol === ' ' ? '#' : '+');
				} else if (shockIntensity > 0.15) {
					t.charColor(255, 107, 107);
					t.cellColor(70, 0, 30);
					t.char(symbol === ' ' ? '=' : symbol);
				} else {
					t.charColor(42, 46, 61);
					t.char(symbol);
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
	drawText('TEXTMODIFIER.MOUSEPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DOWN-STROKE PRESS EVENT', x, y++, 100, 220, 255);
	drawText('Fires on initial down-stroke.', x, y++, 140, 160, 190);
	drawText('Down-stroke fractures truss lines.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('DOWN PRESSES: ' + pressCount, x, y++, 140, 255, 180);
	drawText('LAST DOWN:    ' + lastDown, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
