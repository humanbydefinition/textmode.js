/**
 * @title Textmodifier.mouseScrolled
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let scale = 10.0;
let scrollFlash = 0;

function drawCenteredText(text, row, rgb = [240, 245, 255]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), row);
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

t.mouseScrolled((data) => {
	scale -= data.delta.y * 0.1;
	scale = Math.max(2, Math.min(40, scale));
	scrollFlash = 1.0;
});

t.draw(() => {
	t.background(6, 10, 22);

	t.push();
	const flashColor = [100 + scrollFlash * 155, 200 + scrollFlash * 55, 255];
	t.charColor(flashColor);
	t.char('█');
	t.ellipse(scale, scale);
	t.char('○');
	t.ellipse(scale * 0.5, scale * 0.5);
	t.pop();

	scrollFlash *= 0.9;

	drawCenteredText('Textmodifier.mouseScrolled', -22, [255, 255, 255]);
	drawCenteredText('Triggers on scroll wheel or touchpad.', -20, [150, 170, 200]);
	drawCenteredText('Delta shows direction and speed.', -18, [150, 170, 200]);

	drawCenteredText(`Current Scale: ${scale.toFixed(1)}`, 14, [100, 200, 255]);
	drawCenteredText('Use Mouse Wheel to Zoom', 18, [100, 255, 150]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
