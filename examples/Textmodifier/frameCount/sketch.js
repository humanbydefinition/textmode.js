/**
 * @title Textmodifier.frameCount
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(12, 14, 18);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const fc = t.frameCount;

	const gearAngle1 = fc * 0.04;
	const gearAngle2 = -fc * 0.04;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist1 = Math.hypot(x - 8, y);
			const angle1 = Math.atan2(y, x - 8) + gearAngle1;
			const tooth1 = Math.sin(angle1 * 8) > 0 ? 1 : 0;
			const isGear1 = dist1 <= 8 + tooth1 * 1.5 && dist1 >= 3;

			const dist2 = Math.hypot(x + 8, y);
			const angle2 = Math.atan2(y, x + 8) + gearAngle2;
			const tooth2 = Math.sin(angle2 * 8) > 0 ? 1 : 0;
			const isGear2 = dist2 <= 8 + tooth2 * 1.5 && dist2 >= 3;

			t.push();
			t.translate(x, y);

			if (isGear1) {
				t.charColor(240, 180, 70);
				t.cellColor(40, 28, 10);
				t.char('#');
			} else if (isGear2) {
				t.charColor(200, 120, 60);
				t.cellColor(35, 20, 10);
				t.char('=');
			} else {
				t.charColor(40, 50, 70);
				t.cellColor(12, 14, 18);
				t.char('.');
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

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.FRAMECOUNT', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: PROCEDURAL CLOCKWORK MESH', x, y++);
	t.charColor(140, 160, 190);
	t.print('frameCount increments each frame.', x, y++);
	t.print('Interlocking gears rotate live.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`FRAME COUNT: ${t.frameCount}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
