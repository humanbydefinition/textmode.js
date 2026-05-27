/**
 * @title TextmodeFramebuffer.attachmentCount
 */
const t = textmode.create({
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
	// Requesting exactly 4 color attachments
	fb = t.createFramebuffer({ width: 14, height: 10, attachments: 4 });
});

t.draw(() => {
	t.background(8, 10, 18);

	fb.begin();
	t.clear();
	t.background(15, 12, 30);
	t.charColor(255, 180, 120);
	t.char('A');
	t.push();
	t.rotateZ(t.frameCount * 2.0);
	t.rect(8, 6);
	t.pop();
	fb.end();

	t.push();
	t.translate(0, 3);
	t.image(fb);
	t.pop();
});

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	drawText('ATTACHMENTCOUNT', x, y++, 100, 255, 140);
	drawText('--------------------------------', x, y++, 80, 100, 150);
	drawText('Number of color attachments.', x, y++, 100, 220, 255);
	drawText('--------------------------------', x, y++, 80, 100, 150);

	const count = fb ? fb.attachmentCount : 0;
	drawText(`Attachments: ${count} color targets`, x, y++, 120, 255, 180);
	drawText('0: Character/transform data', x, y++, 160, 160, 160);
	drawText('1: Primary character color', x, y++, 160, 160, 160);
	drawText('2: Secondary background color', x, y++, 160, 160, 160);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
