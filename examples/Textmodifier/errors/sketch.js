/**
 * @title Textmodifier.errors
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let triggerError = false;
const labelLayer = t.layers.add();

t.mouseClicked(() => {
	triggerError = true;
});

t.draw(() => {
	t.background(10, 12, 24);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const corePulse = Math.sin(dist * 0.4 - t.frameCount * 0.08) * 0.5 + 0.5;

			t.push();
			t.translate(x, y);

			if (dist < 4) {
				t.charColor(0, 220, 255);
				t.cellColor(10, 35, 55);
				t.char('#');
			} else if (dist < 12) {
				t.charColor(Math.floor(20 + corePulse * 180), Math.floor(100 + corePulse * 120), 220);
				t.cellColor(10, 15, 30);
				t.char(corePulse > 0.5 ? '*' : '+');
			} else {
				t.charColor(25, 35, 60);
				t.cellColor(10, 12, 24);
				t.char('.');
			}

			t.point();
			t.pop();
		}
	}

	if (triggerError) {
		throw new Error('Intentionally triggered error layer overlay.');
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(255, 100, 100);
	t.print('TEXTMODIFIER.ERRORS', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: AUTOMATED RUNTIME ERROR CAPTURE', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click canvas to throw an error.', x, y++);
	t.print('Textmode renders full error overlay.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(255, 200, 100);
	t.print(`ERRORS INITIALIZED: ${Boolean(t.errors)}`, x, y++);
	t.charColor(255, 120, 120);
	t.print('CLICK TO TRIGGER FAULT OVERLAY', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
