/**
 * @title Textmodifier.pressedKeys
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
	t.background(10, 15, 20);

	const activeList = t.pressedKeys || [];
	const count = activeList.length;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	for (let y = -hh + 2; y <= hh - 2; y += 3) {
		for (let x = -hw + 2; x <= hw - 2; x += 3) {
			const isCross = (x + y) % 6 === 0;
			t.push();
			t.translate(x, y);
			t.charColor(22, 45, 35);
			t.char(isCross ? '+' : '-');
			t.point();
			t.pop();
		}
	}

	const numNodes = 12;
	const ringRad = 12;
	const activeNodes = new Set();

	for (let i = 0; i < count; i++) {
		const key = activeList[i];
		const code = typeof key === 'string' && key.length > 0 ? key.charCodeAt(0) : i;
		activeNodes.add(code % numNodes);
	}

	for (let i = 0; i < numNodes; i++) {
		const ang = (i / numNodes) * Math.PI * 2 + tm;
		const nx = Math.round(Math.cos(ang) * ringRad);
		const ny = Math.round(Math.sin(ang) * (ringRad * 0.6));
		const isActive = activeNodes.has(i);

		t.push();
		t.translate(nx, ny);
		if (isActive) {
			t.charColor(255, 42, 95);
			t.cellColor(90, 0, 30);
			t.char('#');
		} else {
			t.charColor(40, 90, 60);
			t.char('.');
		}
		t.point();
		t.pop();
	}

	if (count > 0) {
		t.push();
		t.printAlign('center', 'middle');
		t.charColor(255, 238, 0);
		t.print('CHORD: ' + activeList.slice(0, 5).join(' + ').toUpperCase(), 0, 0);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	const activeList = t.pressedKeys || [];

	drawText('TEXTMODIFIER.PRESSEDKEYS', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MULTI-KEY CHORD POLYPHONY', x, y++, 100, 220, 255);
	drawText('Array lists all currently held keys.', x, y++, 140, 160, 190);
	drawText('Hold multiple keys to form chords.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('HELD KEY COUNT: ' + activeList.length, x, y++, 140, 255, 180);
	drawText('HELD KEYS:      ' + activeList.slice(0, 4).join(', '), x, y++, 180, 200, 220);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
