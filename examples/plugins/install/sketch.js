/**
 * @title plugins.TextmodePlugin.install
 */
let isInstalled = false;
let coreEnergy = 0;

const quantumPlugin = {
	name: 'quantum-core',
	install(textmodifier) {
		isInstalled = true;
		coreEnergy = 1.0;
		return () => {
			isInstalled = false;
			coreEnergy = 0;
		};
	},
};

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
	plugins: [quantumPlugin],
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(6, 8, 22);
	const cols = t.grid.cols;
	const rows = t.grid.rows;
	const left = -Math.floor((cols - 1) / 2);
	const right = left + cols - 1;
	const top = -Math.floor(rows / 2);
	const bottom = top + rows - 1;
	const tm = t.frameCount * 0.05;

	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			const dist = Math.hypot(x, y);
			const angle = Math.atan2(y, x);
			const spiral = Math.sin(dist * 0.3 - angle * 3 + tm * 2);
			const norm = (spiral + 1) * 0.5;

			const charKey = dist < 3 ? '@' : dist < 8 ? '#' : norm > 0.6 ? '*' : norm > 0.3 ? '+' : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isInstalled ? Math.floor(100 + norm * 155) : 80,
				isInstalled ? Math.floor(180 + norm * 75) : 80,
				isInstalled ? Math.floor(255 - dist * 8) : 80
			);
			t.cellColor(
				isInstalled ? Math.floor(8 + norm * 16) : 4,
				isInstalled ? Math.floor(14 + norm * 20) : 4,
				isInstalled ? Math.floor(32 + norm * 24) : 8
			);
			t.char(charKey);
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
	t.print('PLUGINS.TEXTMODEPLUGIN.INSTALL', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: NEURAL MATRIX CORE IGNITION', x, y++);
	t.charColor(140, 160, 190);
	t.print('install(t, context) initializes state', x, y++);
	t.print('and returns a cleanup function', x, y++);
	t.print('called once on destroy.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`PLUGIN INSTALLED: ${isInstalled}`, x, y++);
	t.print(`CORE ENERGY: ${(coreEnergy * 100).toFixed(0)}%`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
