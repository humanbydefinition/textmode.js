/**
 * @title Textmodifier.secs2
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

t.draw(() => {
	t.background(12, 10, 16);
	const sec = t.secs;
	const phase = Math.floor(sec / 3) % 4;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);

	const seasonNames = ['SPRING BLOOM', 'SUMMER GROWTH', 'AUTUMN DECAY', 'WINTER STASIS'];
	const seasonChars = ['*', '%', '#', 'x'];

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const wave = Math.sin(x * 0.15 + sec) * Math.cos(y * 0.15 - sec);
			const norm = (wave + 1) * 0.5;

			t.push();
			t.translate(x, y);

			if (phase === 0) {
				t.charColor(40, 200, 160);
				t.cellColor(10, 30, 24);
			} else if (phase === 1) {
				t.charColor(240, 200, 60);
				t.cellColor(35, 30, 10);
			} else if (phase === 2) {
				t.charColor(220, 80, 60);
				t.cellColor(30, 12, 10);
			} else {
				t.charColor(160, 220, 255);
				t.cellColor(15, 25, 40);
			}

			t.char(norm > 0.4 ? seasonChars[phase] : '.');
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

	const phase = Math.floor(t.secs / 3) % 4;
	const seasonNames = ['SPRING BLOOM', 'SUMMER GROWTH', 'AUTUMN DECAY', 'WINTER STASIS'];

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODIFIER.SECS2', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: MODULO SEASONAL ECOLOGY', x, y++);
	t.charColor(140, 160, 190);
	t.print('t.secs % 12 drives 4-phase cycle.', x, y++);
	t.print('Transitions occur every 3 seconds.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	t.print(`SEASON: ${seasonNames[phase]}`, x, y++);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
