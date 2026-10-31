/**
 * @title TextmodeTileset.fontFramebuffer
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let tileset = null;
const probe = { col: 0, row: 0 };

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(12, 6, 22);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.04;
	const startX = -8;
	const startY = hh < 20 ? 0 : -8;

	const tx = isFinite(t.mouse.x) ? t.mouse.x : Math.sin(time * 1.5) * 7;
	const ty = isFinite(t.mouse.y) ? t.mouse.y : startY + 7.5 + Math.cos(time * 1.1) * 7;
	probe.col = Math.max(0, Math.min(15, Math.floor(tx - startX)));
	probe.row = Math.max(0, Math.min(15, Math.floor(ty - startY)));

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const col = x - startX;
			const row = y - startY;
			const inAtlas = col >= 0 && col < 16 && row >= 0 && row < 16;
			const hit = col === probe.col && row === probe.row;
			const cross = col === probe.col || row === probe.row;

			const isEdgeX = col === -1 || col === 16;
			const isEdgeY = row === -1 || row === 16;
			const inBorder = (isEdgeX && row >= -1 && row <= 16) || (isEdgeY && col >= -1 && col <= 16);

			t.push();
			t.translate(x, y);

			if (inAtlas) {
				const cr = hit || cross ? 255 : 245 - row * 5;
				const cg = hit ? 255 : cross ? 220 : 75 + col * 8;
				t.charColor(cr, cg, hit ? 255 : 200 + row * 3);
				t.cellColor(hit ? 200 : cross ? 45 : 20, hit ? 40 : cross ? 20 : 10, hit ? 150 : cross ? 55 : 32);
				t.char(row * 16 + col);
			} else if (inBorder) {
				t.charColor(75, 200, 255);
				t.cellColor(16, 10, 28);
				t.char(isEdgeX && isEdgeY ? 43 : isEdgeX ? 124 : 45);
			} else {
				const hexVal = Math.abs(x * 7 + y * 13 + Math.floor(time * 3)) % 16;
				t.charColor(40, 25, 60);
				t.cellColor(12, 6, 22);
				t.char(hexVal < 10 ? 48 + hexVal : 55 + hexVal);
			}

			t.point();
			t.pop();
		}
	}
});

labelLayer.draw(() => {
	t.clear();
	if (!tileset) return;
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;

	t.push();
	t.printAlign('left', 'top');
	t.cellColor(12, 6, 22, 220);
	t.charColor(245, 75, 200);
	t.print('TEXTMODETILESET.FONTFRAMEBUFFER', left, top);
	t.charColor(90, 80, 130);
	t.print('------------------------------------', left, top + 1);
	t.charColor(75, 200, 255);
	t.print('CONCEPT: GPU GLYPH ATLAS VRAM', left, top + 2);
	t.charColor(180, 170, 210);
	t.print('GLFramebuffer texture backing atlas.', left, top + 3);
	t.charColor(245, 75, 200);
	t.print(`ATLAS DIMS: ${tileset.fontFramebuffer.width} x ${tileset.fontFramebuffer.height} PX`, left, top + 4);
	t.charColor(75, 200, 255);
	t.print(`PROBE: #${probe.row * 16 + probe.col} (${probe.col}, ${probe.row})`, left, top + 5);
	t.charColor(255, 225, 250);
	t.print('MOUSE PROBES ATLAS COORDINATES', left, top + 6);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
