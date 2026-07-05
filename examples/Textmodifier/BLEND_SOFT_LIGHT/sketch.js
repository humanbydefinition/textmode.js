/**
 * @title Textmodifier.BLEND_SOFT_LIGHT
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_SOFT_LIGHT;
const modeName = 'BLEND_SOFT_LIGHT';
const accent = [255, 170, 150];
const base = [70, 120, 160];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.86 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.029;
	t.background(12, 20, 30);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.12 + y * 0.15 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '~' : '.');
			t.charColor(base[0], base[1] + wave * 28, base[2]);
			t.cellColor(8, 14, 22);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 5; ring++) {
			for (let i = 0; i < 14; i++) {
				const angle = i * 25.7 + ring * 16 + t.frameCount * 0.9;
				const radius = 5 + ring * 3.5 + Math.sin(time + i) * 1.5;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.cos(time + i) * 2);
				t.char(ring % 2 ? '+' : '*');
				t.charColor(...accent);
				t.cellColor(28 + ring * 14, 20 + ring * 10, 30);
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
	drawText('TEXTMODIFIER.BLEND_SOFT_LIGHT', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: SOFT CONTRAST', x, y++, 100, 220, 255);
	drawText('Texture changes gently.', x, y++, 140, 160, 190);
	drawText('Useful for atmosphere.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
