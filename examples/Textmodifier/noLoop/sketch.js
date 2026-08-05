/**
 * @title Textmodifier.noLoop
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.mousePressed(() => {
	if (t.isLooping()) {
		t.noLoop();
		t.redraw();
	} else {
		t.loop();
	}
});

t.draw(() => {
	const looping = t.isLooping();
	t.background(14, 8, 20);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	const activeChars = ['@', '#', 'O', 'o', '.', ' '];
	const frozenChars = ['+', 'x', ':', '.'];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const coral = Math.sin(dist * 0.3 - tm) * Math.cos(Math.atan2(y, x) * 5 + tm);
			const norm = (coral + 1) * 0.5;

			t.push();
			t.translate(x, y);

			if (looping) {
				const idx = Math.floor(norm * (activeChars.length - 1));
				t.charColor(140, 60, 200);
				t.cellColor(28, 12, 40);
				t.char(activeChars[idx]);
			} else {
				const idx = Math.floor(norm * (frozenChars.length - 1));
				t.charColor(200, 240, 255);
				t.cellColor(20, 30, 45);
				t.char(frozenChars[idx]);
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const looping = t.isLooping();

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.NOLOOP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: HYPERBOLIC CORAL FOSSILIZATION', x, y++);
	t.charColor(140, 160, 190);
	t.print('noLoop() halts automatic per-frame calls.', x, y++);
	t.print('Click toggles noLoop() and loop().', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (looping) {
		t.charColor(140, 255, 180);
		t.print('STATE: LOOPING (ORGANIC GROWTH)', x, y++);
	} else {
		t.charColor(200, 240, 255);
		t.print('STATE: PAUSED (FOSSIL BLUEPRINT)', x, y++);
	}
	t.charColor(255, 220, 140);
	t.print('CLICK TO TOGGLE NOLOOP', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
