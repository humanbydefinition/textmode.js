/**
 * @title Textmodifier.frameRate
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

t.mouseClicked(() => {
	const current = Math.round(t.targetFrameRate());
	t.frameRate(current === 60 ? 10 : 60);
});

t.draw(() => {
	t.background(6, 10, 22);

	const measured = t.frameRate();
	const targetRounded = Math.round(t.targetFrameRate());
	const nearTarget = Math.abs(measured - targetRounded) < 5;

	// Rotating arm (smooth at 60 fps, visibly choppy at 10 fps)
	t.push();
	t.rotateZ(t.frameCount * 3);
	t.charColor(255, 200, 100);
	t.cellColor(60, 40, 20);
	t.char('#');
	t.rect(10, 3);
	t.pop();

	t.push();
	t.rotateZ(t.frameCount * 0.5);
	t.translate(8, 0);
	t.charColor(100, 200, 255);
	t.cellColor(20, 40, 60);
	t.char('*');
	t.rect(3, 3);
	t.pop();

	drawCenteredText('Textmodifier.frameRate', -12, [240, 245, 255]);
	drawCenteredText('Setting target and reading measured frame rate.', -10, [150, 170, 200]);

	drawCenteredText(`t.frameRate() = ${measured.toFixed(1)} fps`, -6, nearTarget ? [140, 255, 180] : [255, 140, 100]);
	drawCenteredText(`t.targetFrameRate() = ${targetRounded} fps`, -3, [140, 180, 255]);

	drawCenteredText('click to toggle 10 / 60 fps', 11, [80, 90, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
