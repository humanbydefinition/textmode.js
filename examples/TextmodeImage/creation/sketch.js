/**
 * @title TextmodeImage.creation
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let image;

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
	image = await t.loadImage(IMAGE_URL);
	image.characters(' .:-=+*#%@');
	image.charColorMode('fixed');
	image.charColor(255, 235, 180);
	image.cellColorMode('sampled');
});

t.draw(() => {
	t.background(6, 10, 18);
	if (!image) return;

	t.push();
	t.rotateZ(Math.sin(t.frameCount * 0.02) * 4);
	t.image(image, t.grid.cols - 8, t.grid.rows - 8);
	t.pop();

	label('TextmodeImage via loadImage()', Math.floor(t.grid.rows / 2) - 3, [255, 220, 120]);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
