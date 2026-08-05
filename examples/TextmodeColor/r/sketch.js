/**
 * @title TextmodeColor.r
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(8, 6, 12);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.03;

	const fx = Math.cos(tm * 0.8) * (hw * 0.35);
	const fy = Math.sin(tm * 0.6) * (hh * 0.35);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const d = Math.hypot(x - fx, y - fy);
			const angle = Math.atan2(y - fy, x - fx);
			const wave = Math.sin(d * 0.35 - angle * 2 - tm * 2);
			const redVal = Math.floor(Math.max(0, Math.min(255, (wave * 0.5 + 0.5) * 230 + 25)));

			const col = t.color(redVal, Math.floor(redVal * 0.25), 30);
			const red = col.r;

			if (red > 45) {
				const norm = (red - 45) / 210;
				const idx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

				t.push();
				t.translate(x, y);
				t.charColor(red, col.g, col.b);
				t.cellColor(Math.floor(red * 0.22), 6, 10);
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

	const sampleCol = t.color(240, 60, 30);
	const red = sampleCol.r;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.R', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: READ RED COLOR CHANNEL', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads 8-bit red property (0-255).', x, y++);
	t.print('Drives stellar flare density.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE RED: ${red} / 255`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
