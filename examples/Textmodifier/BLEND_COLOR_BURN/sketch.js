/**
 * @title Textmodifier.BLEND_COLOR_BURN
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_COLOR_BURN;
const modeName = 'BLEND_COLOR_BURN';
const accent = [120, 50, 70];
const base = [220, 170, 110];
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
	t.background(50, 34, 22);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.13 - y * 0.15 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '%' : '+');
			t.charColor(base[0], base[1] + wave * 28, base[2]);
			t.cellColor(52, 28, 16);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 5; ring++) {
			for (let i = 0; i < 14; i++) {
				const angle = i * 25.7 + ring * 18 - t.frameCount * 1.2;
				const radius = 5 + ring * 3.8 + Math.sin(time * 2 + i) * 2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.cos(time + i) * 2);
				t.char(ring % 2 ? '#' : 'X');
				t.charColor(...accent);
				t.cellColor(24 + ring * 10, 5, 10 + ring * 6);
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
	drawText('TEXTMODIFIER.BLEND_COLOR_BURN', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: BURN SHADOWS', x, y++, 100, 220, 255);
	drawText('Color compresses darker.', x, y++, 140, 160, 190);
	drawText('Motion leaves dense marks.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
