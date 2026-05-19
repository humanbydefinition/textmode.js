/**
 * @title TextmodeSource.texture
 * @author codex
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight, fontSize: 16 });

let source = null;

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
	source = await t.loadImage(IMAGE_URL);
	source.characters(' .:-=+*#%@');
});

t.draw(() => {
	t.background(5, 7, 18);

	if (source) {
		t.image(source, t.grid.cols - 8, t.grid.rows - 10);
	}

	label('TextmodeSource.texture', -Math.floor(t.grid.rows * 0.34), [255, 225, 140]);
	label(
		source && source.texture ? 'webgl texture available' : 'texture pending',
		Math.floor(t.grid.rows * 0.3),
		[120, 205, 255]
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
