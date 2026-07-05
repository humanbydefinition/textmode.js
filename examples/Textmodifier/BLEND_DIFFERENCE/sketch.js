/**
 * @title Textmodifier.BLEND_DIFFERENCE
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_DIFFERENCE;
const modeName = 'BLEND_DIFFERENCE';
const accent = [255, 255, 255];
const base = [70, 180, 190];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.9 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.036;
	t.background(8, 16, 24);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.17 + y * 0.12 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '+' : '-');
			t.charColor(base[0], base[1] + wave * 35, base[2]);
			t.cellColor(4, 12, 20);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 4; ring++) {
			for (let i = 0; i < 18; i++) {
				const angle = i * 20 + ring * 29 + t.frameCount * 1.5;
				const radius = 5 + ring * 4 + Math.sin(time * 2 + i) * 2.5;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.sin(time + i) * 2);
				t.char(ring % 2 ? '@' : '#');
				t.charColor(...accent);
				t.cellColor(70, 70, 70);
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
	drawText('TEXTMODIFIER.BLEND_DIFFERENCE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: INVERT BY DISTANCE', x, y++, 100, 220, 255);
	drawText('Unlike colors spark edges.', x, y++, 140, 160, 190);
	drawText('Overlaps flip the field.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
