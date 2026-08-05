/**
 * @title TextmodeTileset.framebuffer
 */
const T64_URL = 'https://littlebitspace.com/resources/fonts/T64.png';
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let tileset = null;

t.setup(async () => {
	tileset = await t.loadTileset({ source: T64_URL, columns: 16, rows: 16, count: 256, fontSize: 16 });
});

t.draw(() => {
	t.background(4, 16, 10);
	if (!tileset) return;

	const hw = Math.floor(t.grid.cols / 2);
	const hh = Math.floor(t.grid.rows / 2);
	const tm = t.frameCount * 0.05;
	const chars = tileset.characters;
	const sweepAngle = (tm * 2) % (Math.PI * 2);

	for (let y = -hh; y <= hh; y++) {
		for (let x = -hw; x <= hw; x++) {
			const dist = Math.hypot(x, y);
			const angle = (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
			const diff = (sweepAngle - angle + Math.PI * 2) % (Math.PI * 2);

			const isRadarLine = diff < 0.15;
			const isTrail = diff < 1.2;
			const norm = isTrail ? 1 - diff / 1.2 : 0;

			const charIdx = Math.floor(Math.abs(dist * 0.8 + tm * 6) % (chars.length || 1));
			const charKey = isRadarLine ? '@' : isTrail ? (chars[charIdx] ? chars[charIdx].character : '#') : '.';

			t.push();
			t.translate(x, y);
			t.charColor(
				isRadarLine ? 255 : Math.floor(40 + norm * 180),
				isRadarLine ? 255 : Math.floor(100 + norm * 155),
				isRadarLine ? 150 : Math.floor(40 + norm * 80)
			);
			t.cellColor(
				isRadarLine ? 35 : Math.floor(4 + norm * 20),
				isRadarLine ? 45 : Math.floor(16 + norm * 24),
				isRadarLine ? 20 : Math.floor(10 + norm * 15)
			);
			t.char(charKey);
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

	if (!tileset) return;
	const fb = tileset.framebuffer;

	t.push();
	t.printAlign('left', 'top');
	t.charColor(120, 240, 180);
	t.print('TEXTMODETILESET.FRAMEBUFFER', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 210, 255);
	t.print('CONCEPT: REPACKED GPU ATLAS RADAR', x, y++);
	t.charColor(140, 160, 190);
	t.print('GLFramebuffer containing GPU texture.', x, y++);
	t.print('Contains repacked tileset atlas data.', x, y++);
	t.charColor(70, 100, 140);
	t.print('------------------------------------', x, y++);
	t.charColor(140, 255, 200);
	if (fb) {
		t.print(`TEXTURE DIMS: ${fb.width} x ${fb.height} PX`, x, y++);
	}
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
