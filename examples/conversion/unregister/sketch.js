/**
 * @title conversion.TextmodeConversionManager.unregister
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let img = null;
let registered = false;
let customShader = null;

t.setup(async () => {
	const vert = `#version 300 es\nin vec4 a_position; in vec2 a_uv; out vec2 v_uv; void main() { gl_Position = a_position; v_uv = a_uv; }`;
	const frag = `#version 300 es\nprecision highp float; in vec2 v_uv; uniform sampler2D u_image; layout(location = 0) out vec4 o_character; layout(location = 1) out vec4 o_primaryColor; layout(location = 2) out vec4 o_secondaryColor; void main() { vec4 col = texture(u_image, v_uv); float greenLuma = col.g; o_character = vec4(greenLuma * 0.8, 0.0, 0.0, 0.0); o_primaryColor = vec4(0.1, 0.9, 0.3, 1.0); o_secondaryColor = vec4(0.01, 0.05, 0.02, 1.0); }`;

	customShader = await t.createShader(vert, frag);

	t.conversions.register({
		id: 'green-custom',
		createShader: () => customShader,
		createUniforms: (ctx) => ({ u_image: ctx.source.texture }),
	});

	img = await t.loadImage(IMAGE_URL);
	img.characters(' .:-=+*#%@');
	img.conversionMode('green-custom');
	registered = true;
});

t.draw(() => {
	t.background(6, 8, 20);
	if (img) {
		t.image(img, t.grid.cols - 8, t.grid.rows - 10);
	}
});

t.mouseClicked(() => {
	if (!registered || !img) return;
	img.conversionMode('brightness');
	t.conversions.unregister('green-custom');
	registered = false;
});

function drawText(text, x, y, r = 220, g = 230, b = 255) {
	t.push();
	t.printAlign('left', 'top');
	t.charColor(r, g, b);
	t.print(text, x, y);
	t.pop();
}

labelLayer.draw(() => {
	t.clear();
	const left = -Math.floor(t.grid.cols / 2);
	const top = -Math.floor(t.grid.rows / 2);
	let y = top + 3;
	const x = left + 3;

	const mode = registered ? 'green-custom' : 'brightness';

	drawText('CONVERSION.UNREGISTER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DISPOSE CONVERSION STRATEGY', x, y++, 100, 220, 255);
	drawText('Removes registered custom logic.', x, y++, 140, 160, 190);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText(`ACTIVE MODE: ${mode}`, x, y++, 140, 190, 255);
	drawText(
		registered ? 'Click to unregister green-custom.' : 'Strategy unregistered successfully.',
		x,
		y++,
		180,
		255,
		180
	);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
