/**
 * @title Textmodifier.charColor4
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const labelLayer = t.layers.add();

const colorA = t.color(255, 200, 100); // Gold
const colorB = t.color(100, 200, 255); // Sky Blue

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);
	t.cellColor(0, 0, 0, 0);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

labelLayer.draw(() => {
	t.clear();

	drawCenteredText('Textmodifier.charColor (Color Object)', -12, [240, 245, 255]);
	drawCenteredText('Passing a TextmodeColor object directly for reuse.', -10, [150, 170, 200]);

	drawCenteredText('t.charColor(colorObject)', 13, [100, 120, 150]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const cycle = Math.floor(t.frameCount / 60) % 2;
	const activeColor = cycle === 0 ? colorA : colorB;

	t.charColor(activeColor);

	t.push();
	t.char('$');
	t.rotateZ(t.frameCount * 3);
	t.rect(14, 6);
	t.pop();

	t.push();
	t.resetCamera();
	drawCenteredText('REUSABLE COLOR OBJECT', 8, [140, 255, 180]);
	drawCenteredText(`ACTIVE_ID: ${cycle === 0 ? 'colorA' : 'colorB'}`, 10, [140, 180, 255]);
	t.pop();
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
