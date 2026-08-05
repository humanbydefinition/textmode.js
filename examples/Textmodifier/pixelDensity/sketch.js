/**
 * @title Textmodifier.pixelDensity
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let density = 1;

t.mouseClicked(() => {
	density = density === 1 ? 2 : 1;
	t.pixelDensity(density);
});

t.draw(() => {
	t.background(6, 10, 22);
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const scale = density === 2 ? 0.4 : 0.2;

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const moire = Math.sin(dist * scale - t.frameCount * 0.05) * Math.cos((x + y) * 0.1);

			t.push();
			t.translate(x, y);

			if (Math.abs(moire) > 0.6) {
				t.charColor(density === 2 ? 255 : 100, density === 2 ? 180 : 220, 255);
				t.cellColor(15, 30, 55);
				t.char('#');
			} else if (Math.abs(moire) > 0.3) {
				t.charColor(60, 140, 200);
				t.cellColor(10, 20, 38);
				t.char('+');
			} else {
				t.charColor(20, 40, 70);
				t.cellColor(6, 10, 22);
				t.char(x % 2 === 0 ? ':' : '.');
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
	t.print('TEXTMODIFIER.PIXELDENSITY', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: RETINA BACKING STORE SCALING', x, y++);
	t.charColor(140, 160, 190);
	t.print('Click canvas to toggle pixelDensity (1x / 2x).', x, y++);
	t.print('Backing store scales while CSS stays fixed.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`PIXEL DENSITY: ${t.pixelDensity()}X`, x, y++);
	t.charColor(255, 200, 100);
	t.print(`BACKING STORE: ${t.width}x${t.height}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
