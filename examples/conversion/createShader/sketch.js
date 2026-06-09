/**
 * @title conversion.TextmodeConversionStrategy.createShader
 */
const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80';
const t = textmode.create({ pixelDensity: 1, width: window.innerWidth, height: window.innerHeight });

const labelLayer = t.layers.add();
let img = null;
let blueShader = null;

t.setup(async () => {
	const vert = `#version 300 es
		in vec4 a_position;
		in vec2 a_uv;
		out vec2 v_uv;
		void main() {
			gl_Position = a_position;
			v_uv = a_uv;
		}
	`;

	const frag = `#version 300 es
		precision highp float;
		in vec2 v_uv;
		uniform sampler2D u_image;
		layout(location = 0) out vec4 o_character;
		layout(location = 1) out vec4 o_primaryColor;
		layout(location = 2) out vec4 o_secondaryColor;
		void main() {
			vec4 col = texture(u_image, v_uv);
			float blueLuma = col.b;
			o_character = vec4(blueLuma * 0.9, 0.0, 0.0, 0.0);
			o_primaryColor = vec4(0.2, 0.6, 1.0, 1.0);
			o_secondaryColor = vec4(0.01, 0.03, 0.08, 1.0);
		}
	`;

	blueShader = await t.createShader(vert, frag);

	t.conversions.register({
		id: 'blue-mrt',
		createShader: () => blueShader,
		createUniforms: (ctx) => ({ u_image: ctx.source.texture }),
	});

	img = await t.loadImage(IMAGE_URL);
	img.characters(' .:-=+*#%@');
	img.conversionMode('blue-mrt');
});

t.draw(() => {
	t.background(6, 8, 20);
	if (img) {
		t.image(img, t.grid.cols - 8, t.grid.rows - 10);
	}
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

	drawText('CONVERSION.CREATESHADER', x, y++, 100, 255, 140);
	drawText('------------------------------------', x, y++, 80, 100, 150);
	drawText('CONCEPT: DYNAMIC SHADER REGISTER', x, y++, 100, 220, 255);
	drawText('Outputs custom MRT locations for', x, y++, 140, 160, 190);
	drawText('character, primary & secondary.', x, y++, 140, 160, 190);
});

t.windowResized(() => {
	t.resizeCanvas(window.innerWidth, window.innerHeight);
});
