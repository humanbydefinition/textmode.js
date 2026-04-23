/**
 * @title TextmodeFramebuffer.dispose
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let generation = 0;
let fb;

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

function rebuildFramebuffer() {
	if (fb) {
		fb.dispose();
	}

	generation += 1;

	fb = t.createFramebuffer({
		width: 12 + (generation % 3) * 4,
		height: 8 + (generation % 2) * 2,
	});

	fb.begin();
	t.background(14, 12, 30);
	writeLine(`GEN ${generation}`, -1, [255, 220, 140]);
	writeLine('REBUILT', 2, [120, 210, 255]);
	fb.end();
}

rebuildFramebuffer();

t.draw(() => {
	if (t.frameCount > 0 && t.frameCount % 150 === 0) {
		rebuildFramebuffer();
	}

	t.background(6, 8, 18);
	t.push();
	t.translate(0, -4);
	t.rotateZ(Math.sin(t.frameCount * 0.03) * 8);
	t.image(fb);
	t.pop();

	writeLine('DISPOSE BEFORE REBUILDING', 8, [220, 230, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
