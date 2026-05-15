/**
 * @title TextmodeFramebuffer.dispose
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let fb;
let fbSize = 10;
let growing = true;

function drawLabel(text, x, y, col = [255, 255, 255]) {
	t.push();
	t.translate(x, y);
	t.charColor(...col);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

function rebuildFramebuffer() {
	if (fb) {
		fb.dispose();
	}

	if (growing) {
		fbSize += 4;
		if (fbSize >= 26) growing = false;
	} else {
		fbSize -= 4;
		if (fbSize <= 10) growing = true;
	}

	fb = t.createFramebuffer({ width: fbSize, height: fbSize });

	fb.begin();
	t.background(10, 5, 20);
	t.charColor(255, 100, 150);
	t.char('+');
	t.rect(fbSize, fbSize);

	const sizeText = `${fbSize}x${fbSize}`;
	drawLabel(sizeText, -(sizeText.length - 1) / 2, 0, [255, 200, 100]);
	fb.end();
}

rebuildFramebuffer();

t.draw(() => {
	t.background(10, 15, 25);
	const { rows } = t.grid;
	const time = t.frameCount * 0.05;

	if (t.frameCount % 60 === 0) {
		rebuildFramebuffer();
	}

	t.push();
	t.translate(0, -2);
	t.rotateZ(Math.sin(time) * 4);

	t.char(' ');
	t.charColor(255, 255, 255);
	t.cellColor(150, 50, 100, 100);
	t.rect(fb.width + 2, fb.height + 2);

	t.image(fb);
	t.pop();

	const title = '--- DISPOSE & REBUILD ---';
	drawLabel(title, -(title.length - 1) / 2, -(rows - 1) / 2 + 2, [180, 220, 255]);

	const hint = 'FBO is destroyed and recreated every 60 frames';
	drawLabel(hint, -(hint.length - 1) / 2, (rows - 1) / 2 - 2, [150, 150, 200]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
