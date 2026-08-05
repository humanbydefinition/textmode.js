/**
 * @title Textmodifier.secs3
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let scrubTime = 0;

t.mouseDragged(() => {
	if (t.mouse.x !== Number.NEGATIVE_INFINITY) {
		scrubTime = t.mouse.x / 10;
	}
});

t.draw(() => {
	t.background(14, 8, 20);
	const timeVal = t.mouseIsPressed ? scrubTime : t.secs;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const kaleidoChars = ['X', '*', '+', 'o', '.'];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const kDist = Math.hypot(Math.abs(x), Math.abs(y));
			const kAngle = Math.atan2(Math.abs(y), Math.abs(x)) + timeVal * 0.5;
			const wave = (Math.sin(kDist * 0.4 - timeVal) + Math.cos(kAngle * 4)) * 0.5 + 0.5;

			const idx = Math.min(kaleidoChars.length - 1, Math.floor(wave * kaleidoChars.length));

			t.push();
			t.translate(x, y);
			t.charColor(
				t.mouseIsPressed ? 255 : Math.floor(40 + wave * 200),
				t.mouseIsPressed ? Math.floor(180 + wave * 75) : 60,
				Math.floor(180 + wave * 60)
			);
			t.cellColor(22, 12, 30);
			t.char(kaleidoChars[idx]);
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

	const timeVal = t.mouseIsPressed ? scrubTime : t.secs;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.SECS3', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: INTERACTIVE TIME SCRUBBING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Drag mouse to scrub kaleidoscope time.', x, y++);
	t.print('Release to resume real-time t.secs.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (t.mouseIsPressed) {
		t.charColor(255, 200, 80);
		t.print(`SCRUBBING TIME: ${scrubTime.toFixed(2)} SECS`, x, y++);
	} else {
		t.charColor(140, 255, 200);
		t.print(`REAL-TIME SECS: ${t.secs.toFixed(2)} SECS`, x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
