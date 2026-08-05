/**
 * @title Textmodifier.setup
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let seed = 0;
let heightMap = [];

function initTerrain(s) {
	seed = s;
	heightMap = [];
	const hw = 30;
	const hh = 15;
	for (let y = -hh; y <= hh; y++) {
		const row = [];
		for (let x = -hw; x <= hw; x++) {
			const h = (Math.sin(x * 0.15 + seed) + Math.cos(y * 0.15 + seed * 0.5)) * 0.5 + 0.5;
			row.push(h);
		}
		heightMap.push(row);
	}
}

t.setup(() => {
	initTerrain(Math.floor(Math.random() * 999));
});

t.mouseClicked(() => {
	initTerrain(Math.floor(Math.random() * 999));
});

t.draw(() => {
	t.background(12, 14, 18);
	const tm = t.frameCount * 0.04;
	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const charRamp = '#%=+-:.';

	for (let y = -hh; y <= hh; y++) {
		const rIdx = Math.min(heightMap.length - 1, Math.max(0, y + 15));
		for (let x = -hw; x <= hw; x++) {
			const cIdx = Math.min(heightMap[rIdx].length - 1, Math.max(0, x + 30));
			const h = heightMap[rIdx][cIdx];

			const sunLight = Math.sin(x * 0.1 + y * 0.1 + tm) * h;
			const norm = (sunLight + 1) * 0.5;
			const idx = Math.min(charRamp.length - 1, Math.floor(norm * charRamp.length));

			t.push();
			t.translate(x, y);
			t.charColor(Math.floor(30 + norm * 210), Math.floor(160 + norm * 80), Math.floor(100 - norm * 60));
			t.cellColor(8, 20, 14);
			t.char(charRamp[idx]);
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
	t.print('TEXTMODIFIER.SETUP', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: PRE-COMPUTED TERRAIN RAYMARCH', x, y++);
	t.charColor(140, 160, 190);
	t.print('setup() pre-computes heightmap once.', x, y++);
	t.print('draw() animates real-time solar rays.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 180);
	t.print(`TERRAIN SEED: ${seed}`, x, y++);
	t.charColor(240, 180, 80);
	t.print('CLICK TO RE-INITIALIZE SETUP', x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
