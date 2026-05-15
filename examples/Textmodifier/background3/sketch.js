/**
 * @title Textmodifier.background3
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

t.draw(() => {
	const cycle = Math.floor(t.frameCount / 60) % 3;
	const hex = ['#1e1b4b', '#064e3b', '#4c1d95'][cycle];
	t.background(hex);

	drawCenteredText('Textmodifier.background (Hex)', -12, [240, 245, 255]);
	drawCenteredText('Passing a hex string (e.g. #RRGGBB) to set the color.', -10, [150, 170, 200]);

	t.push();
	t.charColor(255, 255, 255, 100);
	t.char('.');
	t.rect(24, 1);
	t.pop();

	drawCenteredText('HEX STRING MODE', 8, [140, 220, 255]);
	drawCenteredText(`ACTIVE: ${hex}`, 10, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
