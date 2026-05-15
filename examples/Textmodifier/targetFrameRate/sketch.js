/**
 * @title Textmodifier.targetFrameRate
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

const targets = [15, 30, 60];
let targetIndex = 2;

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
	targetIndex = (targetIndex + 1) % targets.length;
	t.targetFrameRate(targets[targetIndex]);
});

t.draw(() => {
	t.background(6, 10, 22);

	const target = Math.round(t.targetFrameRate());
	const time = t.frameCount;

	// Three concentric rotating elements at different speeds —
	// all slow down and speed up together when target changes
	t.push();
	t.rotateZ(time * 1.5);
	t.charColor(255, 180, 100);
	t.cellColor(60, 40, 20);
	t.char('#');
	t.rect(10, 3);
	t.pop();

	t.push();
	t.rotateZ(time * -0.8);
	t.translate(8, 0);
	t.charColor(100, 200, 255);
	t.cellColor(20, 40, 60);
	t.char('*');
	t.rect(3, 3);
	t.pop();

	t.push();
	t.rotateZ(time * 0.4);
	t.translate(13, 0);
	t.charColor(255, 100, 150);
	t.cellColor(60, 20, 40);
	t.char('o');
	t.rect(2, 2);
	t.pop();

	drawCenteredText('Textmodifier.targetFrameRate', -12, [240, 245, 255]);
	drawCenteredText('Getting and setting the target frame rate.', -10, [150, 170, 200]);

	drawCenteredText(`t.targetFrameRate() = ${target} fps`, -6, [140, 180, 255]);

	drawCenteredText('click to cycle: 15 / 30 / 60', 11, [80, 90, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
