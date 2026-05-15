/**
 * @title Textmodifier.background4
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

function drawCenteredText(text, y, rgb = [255, 255, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(rgb[0], rgb[1], rgb[2]);

	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}

	t.pop();
}

const colorA = t.color(100, 20, 20); // Dark Red
const colorB = t.color(20, 20, 100); // Dark Blue

t.draw(() => {
	const time = t.frameCount * 0.05;
	const blend = 0.5 + 0.5 * Math.sin(time);

	t.background(blend > 0.5 ? colorA : colorB);

	drawCenteredText('Textmodifier.background (Color Object)', -12, [240, 245, 255]);
	drawCenteredText('Passing a TextmodeColor object directly for reuse.', -10, [150, 170, 200]);

	t.push();
	t.charColor(255, 225, 140);
	t.char('#');
	t.rect(14, 6);
	t.pop();

	drawCenteredText('REUSABLE COLOR OBJECT', 8, [140, 255, 180]);
	drawCenteredText(`ACTIVE_ID: ${blend > 0.5 ? 'colorA' : 'colorB'}`, 10, [140, 180, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
