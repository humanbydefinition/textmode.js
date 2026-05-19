/**
 * @title Textmodifier.conversions
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
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
	hasBrightness = t.conversions.has('brightness');
	img = await t.loadImage(IMAGE_URL);
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
