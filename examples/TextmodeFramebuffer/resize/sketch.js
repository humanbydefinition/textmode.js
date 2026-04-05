/**
 * @title TextmodeFramebuffer.resize
 * @author codex
 */
const t = textmode.create({
	width: 720,
	height: 420,
	fontSize: 16,
});

const fb = t.createFramebuffer({ width: 12, height: 6 });

let lastWidth = 12;
let lastHeight = 6;

function writeLine(text, y, color) {
	const startX = -((text.length - 1) * 0.5);
	t.charColor(...color);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(startX + i, y);
		t.char(text[i]);
		t.point();
		t.pop();
	}
}

t.draw(() => {
	const width = 10 + Math.round((Math.sin(t.frameCount * 0.035) * 0.5 + 0.5) * 18);
	const height = 6 + Math.round((Math.cos(t.frameCount * 0.05) * 0.5 + 0.5) * 10);

	if (width !== lastWidth || height !== lastHeight) {
		fb.resize(width, height);
		lastWidth = width;
		lastHeight = height;
	}

	fb.begin();
	t.background(18, 18, 42);
	writeLine('RESIZE', -1, [255, 210, 120]);
	writeLine(`${width}x${height}`, 2, [140, 210, 255]);
	fb.end();

	t.background(5, 8, 18);
	t.push();
	t.rotateZ(Math.sin(t.frameCount * 0.03) * 10);
	t.image(fb);
	t.pop();

	writeLine('FRAMEBUFFER.RESIZE()', -11, [220, 230, 255]);
});
