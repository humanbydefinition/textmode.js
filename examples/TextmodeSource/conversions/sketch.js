/**
 * @title TextmodeSource.conversions
 * @author codex
 * @description Applies an ordered multi-tier conversion stack mapping distinct brightness intervals to custom glyph sets.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 }),
	cursor = { x: 0, y: 0 };
const layers = [
	{ z: 0.45, s: 0.6, p: 0 },
	{ z: 0.75, s: 0.85, p: 2.1 },
	{ z: 1.1, s: 1.15, p: 4.2 },
];
let source = null,
	repulse = false;

function step(s, e, ch, col) {
	return {
		mode: 'brightness',
		brightnessStart: s,
		brightnessEnd: e,
		characters: ch,
		charColorMode: 'fixed',
		charColor: col,
		cellColorMode: 'fixed',
		cellColor: '#00000000',
	};
}

function createTexture() {
	const c = document.createElement('canvas');
	c.width = c.height = 128;
	const ctx = c.getContext('2d'),
		grad = ctx.createRadialGradient(64, 52, 4, 64, 52, 56);
	grad.addColorStop(0, '#fff');
	grad.addColorStop(0.35, '#999');
	grad.addColorStop(0.7, '#383838');
	grad.addColorStop(1, '#000');
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, 128, 128);
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(64, 52, 56, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = '#ccc';
	ctx.strokeRect(48, 36, 32, 32);
	return c.toDataURL();
}

t.setup(async () => {
	source = await t.loadImage(createTexture());
	source.conversions([
		step(20, 85, ' ~-', '#1e78dc'),
		step(86, 170, '=_+', '#28e6be'),
		step(171, 255, '*#', '#c8fff5'),
	]);
});

t.mouseClicked(() => {
	repulse = !repulse;
});

t.draw(() => {
	t.background(4, 14, 22);
	const time = t.secs,
		cols = t.grid.cols,
		rows = t.grid.rows;
	t.push();
	t.charColor(30, 120, 220);
	for (let i = 0; i < 8; i++) {
		t.print(
			'~',
			Math.round(Math.sin(time * 0.35 + i * 1.8) * cols * 0.44),
			Math.round(Math.cos(time * 0.28 + i * 2.4) * rows * 0.4)
		);
	}
	t.pop();
	if (!source) return;
	const hasMouse = Number.isFinite(t.mouse.x) && Number.isFinite(t.mouse.y);
	const tx = hasMouse ? t.mouse.x : Math.sin(time * 0.85) * (cols * 0.24);
	const ty = hasMouse ? t.mouse.y : Math.cos(time * 0.65) * (rows * 0.2);
	cursor.x += (tx - cursor.x) * 0.08;
	cursor.y += (ty - cursor.y) * 0.08;
	const dir = repulse ? -0.85 : 0.85,
		bw = Math.max(14, Math.floor(cols * 0.32)),
		bh = Math.max(10, Math.floor(rows * 0.32));
	for (let i = 0; i < layers.length; i++) {
		const l = layers[i];
		const wx = Math.sin(time * 1.1 + l.p) * (6 * l.z),
			wy = Math.cos(time * 0.8 + l.p) * (4 * l.z);
		t.push();
		t.translate(Math.round(cursor.x * l.z * dir + wx), Math.round(cursor.y * l.z * dir + wy));
		t.image(source, Math.round(bw * l.s), Math.round(bh * l.s));
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(4, 14, 22, 220);
	const panel = `[fg=#28e6be]TEXTMODESOURCE.CONVERSIONS[/fg]
[fg=#1e78dc]DEPTH: 3 ORDERED BRIGHTNESS BANDS[/fg]
[fg=#c8fff5]MODE: ${repulse ? 'REPULSE' : 'ATTRACT'} (CLICK FLIPS)[/fg]
[fg=#c8fff5]LO: ~- [30,120]  MID: =_+ [40,230][/fg]
[fg=#c8fff5]HI: *# [200,255] (DEEP BIOLUME)[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
