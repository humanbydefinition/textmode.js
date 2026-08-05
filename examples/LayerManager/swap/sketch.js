/**
 * @title LayerManager.swap
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const RAMP = ' .:-=+*#%@';
const warm = t.layers.add({ blendMode: t.BLEND_NORMAL });
const cool = t.layers.add({ blendMode: t.BLEND_NORMAL });
const label = t.layers.add();

function text(value, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(value, x, y);
	t.pop();
}
function put(x, y, glyph, fg, bg) {
	t.push();
	t.translate(x, y);
	t.charColor(fg[0], fg[1], fg[2]);
	if (bg) t.cellColor(bg[0], bg[1], bg[2]);
	t.char(glyph);
	t.point();
	t.pop();
}
function paint(fn, threshold, fgBase, bgBase) {
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2);
	for (let y = -R; y <= R; y++)
		for (let x = -C; x <= C; x++) {
			const v = fn(x, y);
			if (v < threshold) continue;
			const idx = Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length + 1)));
			put(
				x,
				y,
				RAMP[idx],
				[Math.floor(fgBase[0] * v), Math.floor(fgBase[1] * v), Math.floor(fgBase[2] * v)],
				[Math.floor(bgBase[0] * v), Math.floor(bgBase[1] * v), Math.floor(bgBase[2] * v)]
			);
		}
}

warm.draw(() => {
	t.clear();
	const f = t.frameCount * 0.012;
	paint(
		(x, y) =>
			1 - Math.abs((((x + y + Math.sin(x * 0.07 + f) * 4 + Math.cos(y * 0.06 + f * 0.7) * 4) * 0.16) % 2) - 1),
		0.36,
		[235, 130, 35],
		[35, 12, 4]
	);
});

cool.draw(() => {
	t.clear();
	const f = t.frameCount * 0.011;
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2);
	paint(
		(x, y) => {
			let best = 0;
			for (let i = 0; i < 7; i++) {
				const sx = Math.sin(i * 1.9 + f * 0.6) * C * 0.5;
				const sy = Math.cos(i * 1.5 + f * 0.45) * R * 0.5;
				best = Math.max(best, Math.exp(-Math.hypot(x - sx, y - sy) * 0.16));
			}
			return best;
		},
		0.38,
		[60, 175, 240],
		[4, 24, 42]
	);
});

t.draw(() => {
	t.background(4, 7, 18);
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2);
	for (let x = -C; x <= C; x += 4)
		for (let y = -R; y <= R; y += 3) if ((x * 7 + y * 13) % 19 === 0) put(x, y, '.', [16, 24, 45]);
	if (t.frameCount % 120 === 0) t.layers.swap(warm, cool);
});

label.draw(() => {
	t.clear();
	const L = -Math.floor(t.grid.cols / 2),
		T = -Math.floor(t.grid.rows / 2);
	let y = T + 3;
	const warmTop = Math.floor(t.frameCount / 120) % 2 === 0;
	text('LAYERMANAGER.SWAP', L + 3, y++, [100, 255, 140]);
	text('------------------------------------', L + 3, y++, [80, 100, 150]);
	text('Normal blend: top occludes below.', L + 3, y++, [100, 220, 255]);
	text(warmTop ? 'TOP: WARM FIELD' : 'TOP: COOL ORBS', L + 3, y++, [140, 255, 180]);
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
