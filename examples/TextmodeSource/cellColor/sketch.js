/**
 * @title TextmodeSource.cellColor
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

	techSource.charColorMode('fixed').charColor(255);

	techSource.cellColorMode('fixed');
});

t.draw(() => {
	t.background(6, 10, 22);

	if (!techSource) return;

	const time = t.frameCount * 0.04;
	const red = Math.round(40 + 40 * Math.sin(time));
	const blue = Math.round(80 + 40 * Math.cos(time * 0.7));

	techSource.cellColor(red, 40, blue);

	drawCenteredText('TextmodeSource.cellColor', -12, [240, 245, 255]);
	drawCenteredText('Overriding the background color of every cell in a source.', -10, [150, 170, 200]);

	t.push();
	t.translate(0, 0);
	t.image(techSource, 24, 14);
	t.pop();

	drawCenteredText('MODE: FIXED', 9, [140, 255, 180]);
	drawCenteredText(`CELL_COLOR: [${red}, 40, ${blue}]`, 11, [140, 220, 255]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
