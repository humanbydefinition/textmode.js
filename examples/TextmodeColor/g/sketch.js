/**
 * @title TextmodeColor.g
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const RAMP = ' .:-=+*#%@';
const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 14, 12);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.025;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const lattice = Math.sin((x + y) * 0.2 + tm) * Math.cos((x - y) * 0.2 - tm * 0.7);
			const greenVal = Math.floor(Math.max(0, Math.min(255, (lattice * 0.5 + 0.5) * 220 + 35)));

			const col = t.color(20, greenVal, Math.floor(greenVal * 0.35));
			const green = col.g;

			if (green > 50) {
				const norm = (green - 50) / 205;
				const idx = Math.min(RAMP.length - 1, Math.floor(norm * RAMP.length));

				t.push();
				t.translate(x, y);
				t.charColor(col.r, green, col.b);
				t.cellColor(4, Math.floor(green * 0.24), 8);
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

	const sampleCol = t.color(20, 220, 80);
	const green = sampleCol.g;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODECOLOR.G', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: READ GREEN COLOR CHANNEL', x, y++);
	t.charColor(140, 160, 190);
	t.print('Reads 8-bit green property (0-255).', x, y++);
	t.print('Drives bioluminescent grid density.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SAMPLE GREEN: ${green} / 255`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
