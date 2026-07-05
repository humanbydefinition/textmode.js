/**
 * @title Textmodifier.BLEND_COLOR_DODGE
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const mode = t.BLEND_COLOR_DODGE;
const modeName = 'BLEND_COLOR_DODGE';
const accent = [255, 245, 170];
const base = [42, 80, 130];
const blendLayer = t.layers.add({ blendMode: mode, opacity: 0.72 });
const labelLayer = t.layers.add();

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.038;
	t.background(4, 10, 24);
	const { cols, rows } = t.grid;
	for (let y = -Math.floor(rows / 2); y < rows / 2; y += 3) {
		for (let x = -Math.floor(cols / 2); x < cols / 2; x += 3) {
			const wave = Math.sin(x * 0.15 + y * 0.14 + time);
			t.push();
			t.translate(x, y);
			t.char(wave > 0 ? '+' : '.');
			t.charColor(base[0], base[1] + wave * 30, base[2]);
			t.cellColor(3, 8, 20);
			t.rect(2, 2);
			t.pop();
		}
	}
	blendLayer.draw(() => {
		t.clear();
		for (let ring = 0; ring < 4; ring++) {
			for (let i = 0; i < 18; i++) {
				const angle = i * 20 + ring * 19 + t.frameCount * 1.8;
				const radius = 4 + ring * 4 + Math.cos(time * 2 + i) * 2;
				t.push();
				t.rotateZ(angle);
				t.translate(radius, Math.sin(time + i) * 2);
				t.char(ring % 2 ? '*' : '@');
				t.charColor(...accent);
				t.cellColor(45 + ring * 22, 42 + ring * 16, 16);
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
	drawText('TEXTMODIFIER.BLEND_COLOR_DODGE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DODGE FLARES', x, y++, 100, 220, 255);
	drawText('Small marks bloom fast.', x, y++, 140, 160, 190);
	drawText('Highlights push to white.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`MODE: ${modeName}`, x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
