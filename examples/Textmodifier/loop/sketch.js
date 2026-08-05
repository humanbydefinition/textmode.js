/**
 * @title Textmodifier.loop
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.setup(() => {
	t.noLoop();
});

t.mousePressed(() => {
	t.loop();
});

t.draw(() => {
	const looping = t.isLooping();
	t.background(6, 8, 14);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.04;

	const activeRamp = '~=*#@';
	const stasisRamp = '+:. ';

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.1 + tm) * Math.cos(y * 0.1 - tm);
			const norm = (wave + 1) * 0.5;

			t.push();
			t.translate(x, y);

			if (looping) {
				const idx = Math.floor(norm * (activeRamp.length - 1));
				t.charColor(120, Math.floor(180 + norm * 75), Math.floor(80 + norm * 120));
				t.cellColor(10, 20, 16);
				t.char(activeRamp[idx]);
			} else {
				const idx = Math.floor(norm * (stasisRamp.length - 1));
				t.charColor(70, 100, 140);
				t.cellColor(8, 12, 18);
				t.char(stasisRamp[idx]);
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
	t.print('TEXTMODIFIER.LOOP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: FLUID VECTOR FIELD IGNITION', x, y++);
	t.charColor(140, 160, 190);
	t.print('Starts in noLoop() stasis mode.', x, y++);
	t.print('Click calls loop() to ignite stream.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (looping) {
		t.charColor(140, 255, 180);
		t.print('ENGINE STATE: LOOPING (IGNITED)', x, y++);
	} else {
		t.charColor(255, 140, 30);
		t.print('ENGINE STATE: PAUSED (CLICK TO LOOP)', x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
