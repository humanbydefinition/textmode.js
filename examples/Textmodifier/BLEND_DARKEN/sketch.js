/**
 * @title Textmodifier.BLEND_DARKEN
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_DARKEN;
const modeName = 'BLEND_DARKEN';
const accent = [90, 110, 170];
const base = [220, 190, 120];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.88 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.03;
	t.background(46, 40, 25);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.16 - y * 0.1 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '+' : '.');
			t.charColor(base[0], base[1] + wave * 30, base[2]);
			t.cellColor(48, 38, 22);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 5; ring++) {
			for (let i = 0; i < 14; i++) {
				const angle = i * 25.7 + ring * 19 + t.frameCount;
				const radius = 5 + ring * 3.8 + Math.cos(time + i) * 2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.sin(time * 1.5 + i) * 2);
				t.char(ring % 2 ? '%' : '#');
				t.charColor(...accent);
				t.cellColor(10 + ring * 7, 12 + ring * 8, 30 + ring * 14);
				t.rect(4, 3);
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
	drawText('TEXTMODIFIER.BLEND_DARKEN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DARKER CHANNELS', x, y++, 100, 220, 255);
	drawText('Only darker color wins.', x, y++, 140, 160, 190);
	drawText('Moving marks add shade.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
