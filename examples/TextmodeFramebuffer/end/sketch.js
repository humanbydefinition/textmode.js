/**
 * @title TextmodeFramebuffer.end
 */
const t = textmode.create({
	pixelDensity: 1,
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();
let fb;

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

t.setup(() => {
	fb = t.createFramebuffer({ width: 16, height: 10 });
});

t.draw(() => {
	t.background(8, 10, 18);

	// 1. Begin offscreen render pass
	fb.begin();
	t.clear();
	t.background(22, 10, 30);
	t.charColor(255, 180, 100);
	t.char('O');
	t.rect(fb.width, fb.height);
	// 2. end() restores the main canvas as the draw target
	fb.end();

	// 3. Draw the framebuffer result onto the main canvas
	t.push();
	t.translate(0, 3);
	t.rotateZ(t.frameCount * 1.0);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('END', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Restores main canvas target.', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('1. fb.begin() -> draw to framebuffer', x, y++, 140, 160, 190);
	drawText('2. fb.end()   -> restore main', x, y++, 140, 160, 190);
	drawText('3. t.image(fb)-> blit to screen', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
