/**
 * @title TextmodeSource.charColor
 * @author codex
 */
const t = textmode.create({
	width: window.innerWidth,
	height: window.innerHeight,
	fontSize: 16,
});

let techSource;

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

function createTechCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, 128, 128);

	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 4;

	for (let i = 0; i < 3; i++) {
		ctx.beginPath();
		ctx.arc(64, 64, 20 + i * 20, 0, Math.PI * 2);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.moveTo(64, 10);
	ctx.lineTo(64, 118);
	ctx.moveTo(10, 64);
	ctx.lineTo(118, 64);
	ctx.stroke();

	return canvas;
}

t.setup(() => {
	techSource = t.createTexture(createTechCanvas());
	techSource.characters(' .:-=+*#%@');

	techSource.charColorMode('fixed');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!techSource) return;

	const time = t.frameCount * 0.04;
	const r = Math.round(150 + 105 * Math.sin(time));
	const g = Math.round(150 + 105 * Math.cos(time * 0.7));

	techSource.charColor(r, g, 100);

	drawCenteredText('TextmodeSource.charColor', -12, [240, 245, 255]);
	drawCenteredText('Overriding the character color of every cell in a source.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.image(techSource, 24, 14);
	t.pop();

	drawCenteredText('MODE: FIXED', 9, [140, 255, 180]);
	drawCenteredText(`CHAR_COLOR: [${r}, ${g}, 100]`, 11, [255, 225, 140]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
