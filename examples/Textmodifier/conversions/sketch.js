/**
 * @title Textmodifier.conversions
 * @author codex
 */
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 8 });

let img;
let hasBrightness = false;

function label(text, y, color = [220, 220, 220]) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(color[0], color[1], color[2]);
	for (let i = 0; i < text.length; i++) {
		t.push();
		t.translate(i, 0);
		t.char(text[i]);
		t.point();
		t.pop();
	}
	t.pop();
}

t.setup(async () => {
	const source = document.createElement('canvas');
	source.width = 96;
	source.height = 64;
	const ctx = source.getContext('2d');
	ctx.fillStyle = '#111827';
	ctx.fillRect(0, 0, source.width, source.height);
	ctx.fillStyle = '#38bdf8';
	ctx.fillRect(8, 8, 28, 48);
	ctx.fillStyle = '#f59e0b';
	ctx.beginPath();
	ctx.arc(66, 32, 18, 0, Math.PI * 2);
	ctx.fill();

	hasBrightness = t.conversions.has('brightness');
	img = await t.loadImage(source.toDataURL());
	if (hasBrightness) img.conversionMode('brightness');
	img.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(8, 10, 20);
	if (img) {
		t.image(img, t.grid.cols - 8, t.grid.rows - 8);
	}
	label('conversions', -Math.floor(t.grid.rows / 2) + 2, [255, 210, 90]);
	label(`conversions.has('brightness'): ${hasBrightness}`, Math.floor(t.grid.rows / 2) - 3);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
