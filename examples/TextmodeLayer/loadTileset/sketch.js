/**
 * @title TextmodeLayer.loadTileset
 * @author codex
 * @description Loads custom bitmap tileset onto a dedicated layer with authored colors and inspection.
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });
const tilesLayer = t.layers.add({ fontSize: 16 }),
	labelLayer = t.layers.add({ fontSize: 16 });
const HEX = '0123456789ABCDEF';
let authored = true,
	active = 0;

t.setup(async () => {
	await tilesLayer.loadTileset({
		source: 'https://littlebitspace.com/resources/fonts/T64.png',
		columns: 16,
		rows: 16,
		count: 256,
		fontSize: 16,
	});
	tilesLayer.useTileColors(authored);
});
t.mouseClicked(() => {
	authored = !authored;
	tilesLayer.useTileColors(authored);
});

t.draw(() => {
	t.background(14, 9, 4);
	const hw = Math.floor(t.grid.cols / 2),
		gridX = Math.max(5, hw - 18),
		gridY = -8;
	const mx = Number.isFinite(t.mouse.x) ? Math.floor(t.mouse.x) : null;
	const my = Number.isFinite(t.mouse.y) ? Math.floor(t.mouse.y) : null;
	if (mx !== null && my !== null && mx >= gridX && mx < gridX + 16 && my >= gridY && my < gridY + 16) {
		active = (my - gridY) * 16 + (mx - gridX);
	} else if (!t.mouseIsPressed) {
		active = Math.floor(t.frameCount * 0.4) % 256;
	}

	const actCol = active % 16,
		actRow = Math.floor(active / 16);
	t.push();
	t.charColor(180, 90, 16);
	t.print('+' + '-'.repeat(16) + '+', gridX - 1, gridY - 1);
	t.print('+' + '-'.repeat(16) + '+', gridX - 1, gridY + 16);
	for (let r = 0; r < 16; r++) {
		t.print('|', gridX - 1, gridY + r);
		t.print('|', gridX + 16, gridY + r);
		const rLit = r === actRow;
		t.charColor(rLit ? 255 : 140, rLit ? 235 : 70, rLit ? 180 : 16);
		t.print(HEX[r], gridX - 3, gridY + r);
	}
	for (let c = 0; c < 16; c++) {
		const cLit = c === actCol;
		t.charColor(cLit ? 255 : 140, cLit ? 235 : 70, cLit ? 180 : 16);
		t.print(HEX[c], gridX + c, gridY - 2);
	}
	t.pop();
});

tilesLayer.draw(() => {
	t.clear();
	if (!tilesLayer.font?.characters?.length) return;
	const hw = Math.floor(t.grid.cols / 2),
		gridX = Math.max(5, hw - 18),
		gridY = -8;

	for (let i = 0; i < 256; i++) {
		const col = i % 16,
			row = Math.floor(i / 16),
			lit = i === active;
		t.push();
		t.translate(gridX + col, gridY + row);
		t.char(i);
		if (!authored) t.charColor(lit ? 255 : 180, lit ? 235 : 90, lit ? 180 : 16);
		if (lit) t.cellColor(255, 176, 32, 140);
		t.point();
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2) + 2;
	const top = -Math.floor(t.grid.rows / 2) + 2;
	const hex = HEX[Math.floor(active / 16)] + HEX[active % 16];
	t.push();
	t.printAlign('left', 'top');
	t.cellColor(14, 9, 4, 220);
	const panel = `[fg=#ffb020]TEXTMODELAYER.LOADTILESET[/fg]
[fg=#b45a10]------------------------[/fg]
[fg=#ffebb4]CONCEPT: BITMAP TILESET[/fg]
[fg=#ffb020]Loads 256 tiles on layer[/fg]
[fg=#d2a05a]1:1 16px layer grid sync[/fg]
[fg=#b45a10]------------------------[/fg]
[fg=#ffebb4]${authored ? 'MODE: AUTHORED PNG' : 'MODE: CRT AMBER RECOLOR'}[/fg]
[fg=#ffb020]TILE: #${String(active).padStart(3, '0')} (0x${hex})[/fg]
[fg=#d2a05a]GRID: COL ${active % 16}, ROW ${Math.floor(active / 16)}[/fg]
[fg=#b45a10]------------------------[/fg]
[fg=#b45a10]CLICK: TOGGLE COLOR MODE[/fg]
[fg=#b45a10]HOVER: PROBE TILESET GRID[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
