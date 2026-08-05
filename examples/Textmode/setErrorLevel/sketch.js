/**
 * @title Textmode.setErrorLevel
 */
const levels = [
	{ name: 'SILENT', value: TextmodeErrorLevel.SILENT, summary: 'no output' },
	{ name: 'WARNING', value: TextmodeErrorLevel.WARNING, summary: 'console.warn()' },
	{ name: 'ERROR', value: TextmodeErrorLevel.ERROR, summary: 'console.error()' },
	{ name: 'THROW', value: TextmodeErrorLevel.THROW, summary: 'throws' },
];

let activeIndex = 1;
textmode.setErrorLevel(levels[activeIndex].value);

const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const rhoPerLevel = [14, 28, 55, 115];
let state = { x: 1, y: 1, z: 1 };
const trail = [];

t.draw(() => {
	const cycle = 180;
	const idx = Math.floor(t.frameCount / cycle) % levels.length;

	if (idx !== activeIndex) {
		activeIndex = idx;
		textmode.setErrorLevel(levels[activeIndex].value);
		state = { x: 1, y: 1, z: 1 };
		trail.length = 0;
	}

	t.background(18, 20, 28);

	const rho = rhoPerLevel[activeIndex];
	const dt = 0.005;
	const level = activeIndex / (levels.length - 1);

	for (let s = 0; s < 3; s++) {
		state.x += 10 * (state.y - state.x) * dt;
		state.y += (state.x * (rho - state.z) - state.y) * dt;
		state.z += (state.x * state.y - (state.z * 8) / 3) * dt;
		trail.push({
			x: Math.round(state.x * 0.55),
			y: Math.round((state.z - rho * 0.6) * 0.55),
		});
	}

	if (trail.length > 130) trail.splice(0, trail.length - 130);

	for (let i = 0; i < trail.length; i++) {
		const p = trail[i];
		const q = i / trail.length;

		t.push();
		t.translate(p.x, p.y);
		t.charColor(60 + level * 195, 180 - level * 140, 80 + level * 175);
		t.char(q > 0.7 ? '@' : q > 0.4 ? '+' : '.');
		t.point();
		t.pop();
	}
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const level = levels[activeIndex];
	const meter = levels.map((_, i) => (i <= activeIndex ? '|' : '.')).join('');

	drawText('TEXTMODE.SETERRORLEVEL', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: GLOBAL ERROR HANDLING', x, y++, 100, 220, 255);
	drawText('Sets library diagnostic severity.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ACTIVE LEVEL: ${level.name}`, x, y++, 255, 210, 90);
	drawText(`LEVEL METER : ${meter}`, x, y++, 255, 210, 90);
	drawText(`BEHAVIOR    : ${level.summary}`, x, y++, 140, 190, 255);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
