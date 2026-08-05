/**
 * @title LayerManager.remove
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const SPAWNS = [
	[-16, -5],
	[12, -8],
	[3, 5],
	[-7, 9],
	[17, 3],
];
const rings = [];
const labelLayer = t.layers.add();
let spawns = 0;

function drawText(text, x, y, rgb = [255, 255, 255]) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.print(text, x, y);
	t.pop();
}
function put(x, y, glyph, rgb) {
	t.push();
	t.translate(x, y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.char(glyph);
	t.point();
	t.pop();
}

function spawnRing() {
	const [cx, cy] = SPAWNS[spawns++ % SPAWNS.length];
	const layer = t.layers.add({ blendMode: t.BLEND_ADDITIVE });
	const born = t.frameCount;

	layer.draw(() => {
		t.clear();
		const age = t.frameCount - born;
		const r = 1 + age * 0.16;

		for (let a = 0; a < Math.PI * 2; a += 0.09) {
			const ca = Math.cos(a),
				sa = Math.sin(a);
			put(cx + Math.round(ca * r * 2.1), cy + Math.round(sa * r), '.', [120, 220, 255]);
			if (age > 20) put(cx + Math.round(ca * r * 1.15), cy + Math.round(sa * r * 0.55), '.', [70, 140, 190]);
		}
	});

	rings.push({ layer, born });
	t.layers.move(labelLayer, Number.MAX_SAFE_INTEGER);
}

t.draw(() => {
	t.background(3, 7, 18);
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2);

	for (let x = -C; x < C; x += 3)
		for (let y = -R; y < R; y += 2) put(x, y, '.', [10, 18 + (y / R) * 14, 34 + (y / R) * 22]);

	if (t.frameCount % 34 === 0) spawnRing();

	for (let i = rings.length - 1; i >= 0; i--) {
		const age = t.frameCount - rings[i].born;
		rings[i].layer.opacity(Math.max(0, 1 - age / 90));

		if (age > 90) {
			t.layers.remove(rings[i].layer);
			rings.splice(i, 1);
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.REMOVE', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: DISPOSE LAYERS', x, y++, [100, 220, 255]);
	drawText('Dead ripples are removed.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`ACTIVE RINGS: ${rings.length}`, x, y++, [140, 255, 180]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
