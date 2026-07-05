/**
 * @title Textmodifier.BLEND_MULTIPLY
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_MULTIPLY;
const modeName = 'BLEND_MULTIPLY';
const accent = [130, 180, 255];
const base = [220, 150, 90];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.84 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.032;
	t.background(42, 30, 18);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.12 - y * 0.16 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '%' : '+');
			t.charColor(base[0], base[1] + wave * 30, base[2]);
			t.cellColor(50, 28, 12);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 4; ring++) {
			for (let i = 0; i < 20; i++) {
				const angle = i * 18 + ring * 14 - t.frameCount * 1.1;
				const radius = 6 + ring * 4 + Math.cos(time * 2 + i) * 2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.sin(time + ring) * 2);
				t.char(ring % 2 ? 'X' : '#');
				t.charColor(...accent);
				t.cellColor(12, 25 + ring * 20, 58 + ring * 12);
				t.rect(4, 2);
				t.pop();
			}
		}
	});
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.BLEND_MULTIPLY', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: MULTIPLY SHADE', x, y++, 100, 220, 255);
	drawText('Overlap darkens the base.', x, y++, 140, 160, 190);
	drawText('Color stays tied to below.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
