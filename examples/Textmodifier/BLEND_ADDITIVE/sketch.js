/**
 * @title Textmodifier.BLEND_ADDITIVE
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_ADDITIVE;
const modeName = 'BLEND_ADDITIVE';
const accent = [255, 100, 80];
const base = [28, 80, 120];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.78 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.04;
	t.background(4, 8, 18);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.17 + y * 0.11 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '=' : ':');
			t.charColor(base[0], base[1] + wave * 35, base[2]);
			t.cellColor(2, 6, 16);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 5; ring++) {
			for (let i = 0; i < 16; i++) {
				const angle = i * 22.5 + ring * 11 + t.frameCount * 1.6;
				const radius = 4 + ring * 3.8 + Math.sin(time * 2 + i) * 2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.cos(time + i) * 2);
				t.char(ring % 2 ? '*' : '@');
				t.charColor(...accent);
				t.cellColor(35 + ring * 18, 10, 12);
				t.rect(3, 2 + (i % 2));
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
	drawText('TEXTMODIFIER.BLEND_ADDITIVE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: ADDITIVE LIGHT', x, y++, 100, 220, 255);
	drawText('Overlaps grow brighter.', x, y++, 140, 160, 190);
	drawText('Good for sparks and glow.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
