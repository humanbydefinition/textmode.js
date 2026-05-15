/**
 * @title Textmodifier.keyReleased
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let releaseInfo = null;
let fade = 0;

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

t.keyReleased((data) => {
	releaseInfo = {
		key: data.key,
		code: data.code,
	};
	fade = 1.0;
});

t.draw(() => {
	t.background(6, 10, 22);

	if (releaseInfo) {
		t.push();
		t.charColor(255, 100, 100, fade * 255);
		t.char(releaseInfo.key.length === 1 ? releaseInfo.key : '?');
		t.rect(12, 12);
		t.pop();

		drawCenteredText(`Released: "${releaseInfo.key}"`, 8, [255, 150, 150, fade * 255]);
		fade *= 0.95;
	}

	drawCenteredText('Textmodifier.keyReleased', -20, [255, 255, 255]);
	drawCenteredText('An event callback that triggers when a key is released.', -18, [150, 170, 200]);
	drawCenteredText('Useful for stopping actions like movement or charging.', -16, [150, 170, 200]);

	drawCenteredText('Press and RELEASE any key', 18, [100, 100, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
