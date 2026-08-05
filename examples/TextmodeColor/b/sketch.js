/**
 * @title TextmodeColor.b
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const d1 = Math.hypot(x - Math.cos(tm) * 8, y - Math.sin(tm) * 6);
			const d2 = Math.hypot(x + Math.sin(tm * 0.7) * 8, y + Math.cos(tm * 0.7) * 6);
			const wave = (Math.sin(d1 * 0.3 - tm * 1.5) + Math.cos(d2 * 0.3 - tm * 1.2)) * 0.5;
			const blueVal = Math.floor(Math.max(0, Math.min(255, (wave * 0.5 + 0.5) * 220 + 35)));

			const col = t.color(15, Math.floor(blueVal * 0.5), blueVal);
			const blue = col.b;

			if (blue > 45) {
				const norm = (blue - 45) / 210;
				const idx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

				t.push();
				t.translate(x, y);
				t.charColor(col.r, col.g, blue);
				t.cellColor(4, 12, Math.floor(blue * 0.25));
				t.char(RAMP[idx]);
				t.point();
				t.pop();
			}
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const sampleCol = t.color(15, 120, 240);
	const blue = sampleCol.b;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.B', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: READ BLUE COLOR CHANNEL', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads 8-bit blue property (0-255).', x, y++);
	t.print('Drives oceanic caustic ripples.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE BLUE: ${blue} / 255`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
