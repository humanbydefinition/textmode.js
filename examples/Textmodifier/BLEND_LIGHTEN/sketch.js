/**
 * @title Textmodifier.BLEND_LIGHTEN
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_LIGHTEN;
const modeName = 'BLEND_LIGHTEN';
const accent = [255, 230, 130];
const base = [40, 70, 105];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.82 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.034;
	t.background(8, 15, 28);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.13 + y * 0.18 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? ':' : '.');
			t.charColor(base[0], base[1] + wave * 25, base[2]);
			t.cellColor(5, 10, 22);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 5; ring++) {
			for (let i = 0; i < 14; i++) {
				const angle = i * 25.7 + ring * 13 - t.frameCount * 1.1;
				const radius = 4 + ring * 4 + Math.sin(time + i) * 2.2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.cos(time * 1.6 + i) * 2);
				t.char(ring % 2 ? '*' : '+');
				t.charColor(...accent);
				t.cellColor(45 + ring * 15, 42 + ring * 10, 18);
				t.rect(3, 3);
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
	drawText('TEXTMODIFIER.BLEND_LIGHTEN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: LIGHTER CHANNELS', x, y++, 100, 220, 255);
	drawText('Only brighter color wins.', x, y++, 140, 160, 190);
	drawText('Moving marks reveal light.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
