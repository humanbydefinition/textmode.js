/**
 * @title TextmodeSource.conversionMode
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

let source;

function drawLabel(text, y) {
	t.push();
	t.translate(-Math.floor(text.length / 2), y);
	t.charColor(255);

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
	source = await t.loadImage(IMAGE_URL);
	source.conversionMode('brightness');
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(0);
	if (!source) return;

	t.image(source, source.width, source.height);
	drawLabel("conversionMode('brightness')", Math.floor(t.grid.rows / 2) - 2);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
