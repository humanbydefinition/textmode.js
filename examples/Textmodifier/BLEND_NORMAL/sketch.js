/**
 * @title Textmodifier.BLEND_NORMAL
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_NORMAL;
const modeName = 'BLEND_NORMAL';
const accent = [250, 180, 90];
const base = [35, 70, 120];
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
	const time = t.frameCount * 0.035;
	t.background(8, 10, 22);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.18 + y * 0.13 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '+' : '.');
			t.charColor(base[0] + wave * 30, base[1] + 20, base[2]);
			t.cellColor(4, 8, 18);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 4; ring++) {
			for (let i = 0; i < 18; i++) {
				const angle = i * 20 + ring * 17 + t.frameCount * (1.2 + ring * 0.2);
				const radius = 5 + ring * 4 + Math.sin(time * 2 + i) * 1.5;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.sin(time + i) * 2);
				t.rotateZ(-angle * 0.5);
				t.char(ring % 2 ? '@' : '#');
				t.charColor(...accent);
				t.cellColor(20 + ring * 18, 16, 32 + ring * 12);
				t.rect(3 + (i % 2), 2);
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
	drawText('TEXTMODIFIER.BLEND_NORMAL', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: NORMAL BLEND', x, y++, 100, 220, 255);
	drawText('Animated layer covers below.', x, y++, 140, 160, 190);
	drawText('Opacity controls the mix.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
