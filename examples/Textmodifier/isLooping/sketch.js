/**
 * @title Textmodifier.isLooping
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
	t.background(looping ? 12 : 24, 16, looping ? 24 : 16);

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;

	const flowChars = ['/', '\\', '|', '-', '+', '#'];
	const stasisChars = ['+', 'x', ':', '.'];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist1 = Math.hypot(x - Math.cos(tm) * 10, y - Math.sin(tm) * 6);
			const dist2 = Math.hypot(x + Math.cos(tm) * 10, y + Math.sin(tm) * 6);
			const moire = (Math.sin(dist1 * 0.4) + Math.sin(dist2 * 0.4)) * 0.5 + 0.5;

			t.push();
			t.translate(x, y);

			if (looping) {
				const idx = Math.floor(moire * (flowChars.length - 1));
				t.charColor(60, Math.floor(180 + moire * 75), Math.floor(140 + moire * 115));
				t.cellColor(16, 28, 40);
				t.char(flowChars[idx]);
			} else {
				const idx = Math.floor(moire * (stasisChars.length - 1));
				t.charColor(240, 180, 60);
				t.cellColor(40, 30, 12);
				t.char(stasisChars[idx]);
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
	t.print('TEXTMODIFIER.ISLOOPING', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: OPTICAL MOIRE WEAVE STATE', x, y++);
	t.charColor(140, 160, 190);
	t.print('isLooping() queries active frame loop.', x, y++);
	t.print('Click toggles noLoop() and loop().', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	if (looping) {
		t.charColor(140, 255, 180);
		t.print('ISLOOPING(): TRUE (KINETIC MOIRE)', x, y++);
	} else {
		t.charColor(240, 180, 60);
		t.print('ISLOOPING(): FALSE (BLUEPRINT FREEZE)', x, y++);
	}
	t.charColor(255, 220, 140);
	t.print('CLICK TO TOGGLE STATE', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
