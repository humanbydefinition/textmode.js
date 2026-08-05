/**
 * @title Textmodifier.keyTyped
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const labelLayer = t.layers.add();
let buffer = 'TEXTMODE.JS',
	typedCount = 0;

function drawText(txt, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(txt, x, y);
	t.pop();
}

function getCardChar(cx, cy, w, h) {
	if ((cy === 0 || cy === h - 1) && (cx === 0 || cx === w - 1)) return '+';
	return cy === 0 || cy === h - 1 ? '-' : '|';
}

t.keyTyped((data) => {
	if (data.key && data.key.length === 1) {
		typedCount++;
		buffer = (buffer + data.key).slice(-28);
	}
});

t.draw(() => {
	t.background(4, 16, 8);
	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2),
		tm = t.frameCount * 0.05;

	for (let y = -hh; y <= hh; y += 2) {
		for (let x = -hw; x <= hw; x += 2) {
			const rain = (Math.sin(x * 0.2 + tm + y * 0.1) + 1) * 0.5;
			if (rain > 0.65) {
				t.push();
				t.translate(x, y);
				t.charColor(10, Math.floor(40 + rain * 60), 20);
				t.char(String.fromCharCode(65 + ((x + y + Math.floor(tm)) % 26)));
				t.point();
				t.pop();
			}
		}
	}

	const cardW = 32,
		cardH = 5,
		startX = -16,
		startY = -2;
	for (let cy = 0; cy < cardH; cy++) {
		for (let cx = 0; cx < cardW; cx++) {
			const isEdge = cx === 0 || cx === cardW - 1 || cy === 0 || cy === cardH - 1;
			t.push();
			t.translate(startX + cx, startY + cy);
			t.cellColor(2, 24, 12);
			t.charColor(0, 180, 80);
			t.char(isEdge ? getCardChar(cx, cy, cardW, cardH) : ' ');
			t.point();
			t.pop();
		}
	}

	t.push();
	t.printAlign('center', 'middle');
	t.charColor(0, 255, 102);
	t.print(buffer + (Math.floor(t.frameCount / 20) % 2 === 0 ? '_' : ' '), 0, 0);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2),
		top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('TEXTMODIFIER.KEYTYPED', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: PRINTABLE INPUT BUFFER', x, y++, 100, 220, 255);
	drawText('Captures printable typed characters.', x, y++, 140, 160, 190);
	drawText('Type any key to append to stream.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('TYPED CHARACTERS: ' + typedCount, x, y++, 140, 255, 180);
	drawText('BUFFER LENGTH:    ' + buffer.length, x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
