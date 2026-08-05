/**
 * @title LayerManager.clear
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const REGIMES = [
	{ name: 'RAIN', glyph: '|', rise: false, vel: 0.9, sway: 0, tint: [150, 190, 255] },
	{ name: 'EMBERS', glyph: '*', rise: true, vel: 0.3, sway: 2, tint: [255, 170, 60] },
	{ name: 'SNOW', glyph: '*', rise: false, vel: 0.14, sway: 2, tint: [225, 235, 255] },
];
let mode = 0;
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
const hash = (x, y) => Math.abs(Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;

function drawHud() {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('LAYERMANAGER.CLEAR', x, y++, [100, 255, 140]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText('CONCEPT: WIPE USER LAYERS', x, y++, [100, 220, 255]);
	drawText('clear() rebuilds the stack.', x, y++, [140, 160, 190]);
	drawText('------------------------------------', x, y++, [80, 100, 150]);
	drawText(`REGIME: ${REGIMES[mode % 3].name}`, x, y++, [140, 255, 180]);
}

function weatherLayer(near) {
	const layer = t.layers.add({ blendMode: t.BLEND_ADDITIVE, opacity: near ? 0.9 : 0.5 });

	layer.draw(() => {
		t.clear();
		const C = Math.floor(t.grid.cols / 2),
			R = Math.floor(t.grid.rows / 2);
		const rg = REGIMES[mode % REGIMES.length];
		const rgb = near ? rg.tint : rg.tint.map((c) => Math.floor(c * 0.5));
		const f = t.frameCount;

		for (let i = 0; i < (near ? 34 : 60); i++) {
			const h = hash(i, near ? 3 : 7);
			const travel = (h * t.grid.rows + f * rg.vel * (0.6 + h) * (near ? 1 : 0.6)) % t.grid.rows;
			const x = Math.floor(hash(i, 11) * t.grid.cols) - C + Math.round(Math.sin(f * 0.03 + i) * rg.sway);
			const ground = R * 0.45 + Math.sin(x * 0.05 + 1) * 3 + Math.sin(x * 0.13) * 2;
			const y = Math.floor(rg.rise ? ground - travel : Math.min(travel - R, ground));
			put(x, y, near ? rg.glyph : '.', rgb);
		}
	});
}

function rebuild() {
	t.layers.clear();
	mode++;
	weatherLayer(false);
	weatherLayer(true);
	t.layers.add().draw(drawHud);
}

t.setup(() => rebuild());

t.draw(() => {
	t.background(4, 8, 12);
	const C = Math.floor(t.grid.cols / 2),
		R = Math.floor(t.grid.rows / 2);

	for (let x = -C; x < C; x++) {
		const ridge = R * 0.45 + Math.sin(x * 0.05 + 1) * 3 + Math.sin(x * 0.13) * 2;
		for (let y = -R; y < R; y++) {
			const h = hash(x, y);
			if (h > 0.986 && y < ridge) put(x, y, h > 0.994 ? '+' : '.', [70, 90, 110]);
			if (y > ridge) put(x, y, y - ridge > 4 ? '#' : ':', [16, 34, 30]);
		}
	}

	if (t.frameCount % 240 === 0) rebuild();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
