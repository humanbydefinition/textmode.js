/**
 * @title Textmodifier.colorMode
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 8,
});

const labelLayer = t.layers.add();
const glyphs = ' .:-=+*#%@';

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.colorMode('rgb');
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

function paintCell(mode, u, v, wave, curl, hue) {
	const shimmer = (wave + curl) * 0.5;
	if (mode === 'rgb') {
		t.colorMode('rgb', 255);
		t.cellColor(4 + 34 * wave, 8 + 30 * u, 18 + 52 * v);
		t.charColor(70 + 185 * u, 70 + 185 * wave, 250 - 130 * v);
		return;
	}
	if (mode === 'hsb') {
		t.colorMode('hsb', 360, 100, 100, 1);
		t.cellColor(hue, 92, 2 + 24 * wave);
		t.charColor(hue + shimmer * 70, 95, 10 + 90 * wave);
		return;
	}
	t.colorMode('hsl', 360, 100, 100, 1);
	t.cellColor(hue, 65, 8 + 45 * curl);
	t.charColor(hue + shimmer * 120, 95, 8 + 84 * wave);
}

function paintPanel(mode, index, left, top, panelWidth, height, time) {
	const x0 = left + index * panelWidth;
	const x1 = index === 2 ? left + t.grid.cols : x0 + panelWidth;
	const y0 = top + 11;
	for (let y = y0; y < top + height - 2; y++) {
		t.push();
		t.translate(x0, y);
		for (let x = x0; x < x1; x++) {
			const u = (x - x0) / Math.max(1, x1 - x0 - 1);
			const v = (y - y0) / Math.max(1, height - 13);
			const dx = u * 2 - 1;
			const dy = v * 2 - 1;
			const radius = Math.sqrt(dx * dx + dy * dy);
			const angle = Math.atan2(dy, dx);
			const wave = (Math.sin(radius * 12 - time * 2.4 + angle * 5) + 1) * 0.5;
			const curl = (Math.sin((u - v) * 10 + time + index * 1.7) + 1) * 0.5;
			const hue = (angle * 180) / Math.PI + 180 + time * 42 + index * 36;
			const glyph = glyphs[Math.floor((wave * 0.65 + curl * 0.35) * (glyphs.length - 1))];
			t.char(glyph);
			paintCell(mode, u, v, wave, curl, hue);
			t.point();
			t.translate(1, 0);
		}
		t.pop();
	}
}

t.draw(() => {
	t.colorMode('rgb');
	t.background(4, 6, 14);
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	const panelWidth = Math.floor(t.grid.cols / 3);
	const time = t.frameCount * 0.035;
	paintPanel('rgb', 0, left, top, panelWidth, t.grid.rows, time);
	paintPanel('hsb', 1, left, top, panelWidth, t.grid.rows, time);
	paintPanel('hsl', 2, left, top, panelWidth, t.grid.rows, time);
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;
	drawText('TEXTMODIFIER.COLORMODE', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('RGB: CHANNEL MIXING', x, y++, 255, 150, 120);
	drawText('HSB: BRIGHTNESS TO BLACK', x, y++, 120, 220, 255);
	drawText('HSL: LIGHTNESS TO WHITE', x, y++, 210, 170, 255);
	drawText('Same hue, different third value.', x, y++, 140, 160, 190);
	drawText('Glyphs and cells both respond.', x, y++, 140, 255, 180);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
