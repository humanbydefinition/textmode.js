/**
 * @title TextmodeTileset.creation
 * @author codex
 * @description Loads an authored bitmap tileset sheet and renders an interactive amber typography specimen.
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const MODES = ['ATLAS SPECIMEN', 'KINETIC RIBBONS'];

const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

const labelLayer = t.layers.add({ fontSize: 16 });
let tileset = null,
	mode = 0,
	selTile = 0;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.mouseClicked(() => {
	mode = (mode + 1) % MODES.length;
});

t.draw(() => {
	t.background(14, 9, 4);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2),
		hh = Math.floor(t.grid.rows / 2);
	const time = t.frameCount * 0.015;
	const hasM = Number.isFinite(t.mouse.x) && (t.mouse.x !== 0 || t.mouse.y !== 0);
	const tx = hasM ? t.mouse.x : Math.sin(time) * (hw * 0.45);
	const ty = hasM ? t.mouse.y : Math.cos(time * 0.8) * (hh * 0.35);

	if (mode === 0) {
		const ox = -8,
			oy = -4;
		for (let row = 0; row < 16; row++) {
			for (let col = 0; col < 16; col++) {
				const tile = row * 16 + col,
					x = ox + col,
					y = oy + row;
				const isHover = Math.hypot(x - tx, y - ty) < 1.6;
				const pulse = Math.sin(time * 2 + (row + col) * 0.3) * 0.5 + 0.5;
				if (isHover) selTile = tile;
				t.push();
				t.translate(x, y);
				t.charColor(
					isHover ? 255 : pulse > 0.6 ? 255 : 180,
					isHover ? 235 : pulse > 0.6 ? 176 : 90,
					isHover ? 180 : 20
				);
				t.cellColor(isHover ? 180 : 14, isHover ? 90 : 9, isHover ? 16 : 4, isHover ? 200 : 120);
				t.char(tile);
				t.point();
				t.pop();
			}
		}
	} else {
		for (let y = -hh + 3; y <= hh - 3; y += 2) {
			const shift = Math.floor(time * 6 * (y % 4 === 0 ? 1 : -1) + y * 4);
			for (let x = -hw; x <= hw; x++) {
				if (x < -hw + 38 && y < -hh + 12) continue;
				const tile = (((x + shift) % 256) + 256) % 256;
				const lit = Math.abs(x - tx) < 3.5;
				t.push();
				t.translate(x, y);
				t.charColor(lit ? 255 : 200, lit ? 235 : 120, lit ? 180 : 20);
				if (lit) t.cellColor(180, 90, 16, 120);
				t.char(tile);
				t.point();
				t.pop();
			}
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
	t.cellColor(14, 9, 4, 255);
	const panel = `[fg=#ffb020]TEXTMODETILESET.CREATION // A6[/fg]
[fg=#b45a10]------------------------------------[/fg]
[fg=#ffebb4]AUTHORED T64 BITMAP ATLAS (16x16)[/fg]
[fg=#ffb020]MODE  : [${MODES[mode]}] (CLICK TO CYCLE)[/fg]
[fg=#ffebb4]TILE  : ID #${selTile} (0x${selTile.toString(16).toUpperCase().padStart(2, '0')})[/fg]
[fg=#b45a10]PACE  : CALM KINETIC SPECIMEN[/fg]
[fg=#ffb020]HOVER : INSPECT | CLICK: MODE[/fg]`;
	t.print(panel, left, top);
	t.pop();
});

t.windowResized(() => t.resizeCanvas(window.innerWidth, window.innerHeight));
