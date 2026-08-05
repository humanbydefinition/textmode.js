/**
 * @title Textmodifier.keyPressed
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add(),
	rings = [],
	bars = new Array(10).fill(0);
let keyCount = 0,
	lastKey = 'NONE';

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

t.keyPressed((data) => {
	keyCount++;
	const k = data.key || 'KEY';
	lastKey = k;
	rings.unshift({ age: 0, maxAge: 45, char: k.length === 1 ? k : '+' });
	bars[(k.length > 0 ? k.charCodeAt(0) : 0) % 10] = 1.0;
	if (rings.length > 10) rings.length = 10;
});

t.draw(() => {
	t.background(10, 5, 24);
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);

	for (let i = rings.length - 1; i >= 0; i--) {
		if (++rings[i].age >= rings[i].maxAge) rings.splice(i, 1);
	}

	for (let i = 0; i < 10; i++) {
		bars[i] *= 0.94;
		const h = Math.floor(bars[i] * 12),
			bx = (i - 4.5) * 4;
		for (let dy = 0; dy < h; dy++) {
			t.push();
			t.translate(Math.round(bx), hh - 4 - dy);
			t.charColor(255, Math.floor(100 + dy * 12), Math.floor(dy * 20));
			if (dy > 8) t.cellColor(90, 0, 50);
			t.char(dy === h - 1 ? '=' : '#');
			t.point();
			t.pop();
		}
	}

	for (let y = -hh; y <= hh; y += 1) {
		for (let x = -hw; x <= hw; x += 1) {
			const d = Math.hypot(x, y);
			let ringIntensity = 0,
				ringChar = '+';
			for (let i = 0; i < rings.length; i++) {
				const r = rings[i],
					rad = r.age * 0.9,
					dist = Math.abs(d - rad);
				if (dist < 2.0) {
					ringIntensity += (1 - dist / 2.0) * (1 - r.age / r.maxAge);
					if (r.char.length === 1) ringChar = r.char;
				}
			}
			if (ringIntensity > 0.15) {
				t.push();
				t.translate(x, y);
				t.charColor(0, 240, 255);
				if (ringIntensity > 0.4) t.cellColor(0, 60, 90);
				t.char(ringChar);
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

	drawText('TEXTMODIFIER.KEYPRESSED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INITIAL KEY DOWN EVENT', x, y++, 100, 220, 255);
	drawText('Fires on initial key down-stroke.', x, y++, 140, 160, 190);
	drawText('Keypress ejects frequency shockwave.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('KEY PRESSES:   ' + keyCount, x, y++, 140, 255, 180);
	drawText('LAST KEY DOWN: ' + lastKey, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
