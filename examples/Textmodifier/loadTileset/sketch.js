/**
 * @title Textmodifier.loadTileset
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

let source;

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.setup(async () => {
	source = await t.loadTileset({
		source: 'https://littlebitspace.com/resources/fonts/T64.png',
		columns: 16,
		rows: 16,
		count: 256,
	});
});

t.draw(() => {
	t.background(6, 10, 22);
	if (source) {
		for (let i = 0; i < 64; i++) {
			t.push();
			t.translate((i % 16) - 8, Math.floor(i / 16));
			t.char(i);
			t.charColor(120, 220, 255);
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
	drawText('TEXTMODIFIER.LOADTILESET', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LOAD TILESET', x, y++, 100, 220, 255);
	drawText('Loads media for this example.', x, y++, 140, 160, 190);
	drawText('HUD stays on a top layer.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(source ? 'TILESET: READY' : 'TILESET: WAIT', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
