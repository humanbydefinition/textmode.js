/**
 * @title TextmodeFramebuffer.begin
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
const fb = t.createFramebuffer({ width: 20, height: 12 });

function drawText(text, x, y, r = 200, g = 220, b = 255) {
	t.push();
	t.translate(x, y);
	t.charColor(r, g, b);
	for (let i = 0; i < text.length; i++) {
		t.char(text[i]);
		t.point();
		t.translate(1, 0);
	}
	t.pop();
}

t.draw(() => {
	const time = t.frameCount * 0.05;

	fb.begin();
	t.background(15, 10, 30);
	for (let i = 0; i < 12; i++) {
		const angle = time + i * 0.52;
		t.push();
		t.charColor(255, 150 + i * 5, 100 + i * 8);
		t.char('@');
		t.translate(Math.cos(angle) * 6, Math.sin(angle) * 4);
		t.rect(2, 2);
		t.pop();
	}
	fb.end();

	t.background(6, 8, 18);
	for (let i = 0; i < 4; i++) {
		const angle = time * 0.3 + i * (Math.PI / 2);
		t.push();
		t.translate(Math.cos(angle) * 16, Math.sin(angle) * 8);
		t.image(fb);
		t.pop();
	}
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('BEGIN', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Redirect draw calls to the framebuffer.', x, y++, 100, 220, 255);
	drawText('4 copies orbit the screen using', x, y++, 140, 160, 190);
	drawText('the same offscreen buffer.', x, y++, 140, 160, 190);
	drawText('--------------------------------', x, y++, 80, 100, 150);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
