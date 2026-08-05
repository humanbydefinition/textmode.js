/**
 * @title LayerManager.all
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const pigments = [
	[243, 114, 92],
	[65, 205, 177],
	[105, 127, 246],
	[244, 196, 94],
];
const curtains = pigments.map((color) => t.layers.add({ blendMode: t.BLEND_SCREEN, opacity: 0.64 }));
const labelLayer = t.layers.add();

function text(value, x, y, color = [220, 230, 245]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(...color);
	t.print(value, x, y);
	t.pop();
}
function put(x, y, glyph, color) {
	t.push();
	t.translate(x, y);
	t.charColor(...color);
	t.char(glyph);
	t.point();
	t.pop();
}
function curtain(index) {
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2),
		f = t.frameCount * 0.026;
	for (let y = -R; y <= R; y++) {
		const spine = Math.sin(y * 0.13 + index * 1.8 + f) * (8 + index * 2) + Math.sin(y * 0.035 - f) * 7;
		for (let width = -5; width <= 5; width += 2) {
			const x = Math.round(spine + width + Math.sin(y * 0.31 + f * 2) * 2);
			if (Math.abs(x) < C - 2 && (y + width + index) % 3 !== 0)
				put(x, y, width === 0 ? '|' : ':', pigments[index]);
		}
	}
}

curtains.forEach((layer, index) =>
	layer.draw(() => {
		t.clear();
		curtain(index);
	})
);
t.draw(() => {
	t.background(7, 8, 22);
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2),
		f = t.frameCount * 0.018;
	for (let x = -C; x <= C; x += 4)
		for (let y = -R; y <= R; y += 3) if ((x * 3 + y) % 11 === 0) put(x, y, '.', [28, 36, 70]);
	t.layers.all
		.filter((layer) => layer !== labelLayer)
		.forEach((layer, index) => {
			layer.offset(Math.sin(f + index * 1.7) * 6, Math.cos(f * 1.4 + index) * 2);
			layer.opacity(0.44 + 0.32 * (0.5 + 0.5 * Math.sin(f * 3 + index)));
		});
});
labelLayer.draw(() => {
	t.clear();
	const L = -Math.floor(t.grid.cols / 2),
		T = -Math.floor(t.grid.rows / 2);
	text('LAYERMANAGER.ALL', L + 3, T + 3, [100, 255, 140]);
	text('------------------------------------', L + 3, T + 4, [80, 100, 150]);
	text('THE WHOLE STACK DRIFTS TOGETHER', L + 3, T + 5, [100, 220, 255]);
	text(`LIVE CURTAINS: ${t.layers.all.length - 1}`, L + 3, T + 6, [140, 255, 180]);
});
t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
